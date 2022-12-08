/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsDragService, VtsResizeService } from '@ui-vts/ng-vts/core/services';
import { BooleanInput, NumberInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsCarouselContentDirective } from './carousel-content.directive';
import { VtsCarouselBaseStrategy } from './strategies/base-strategy';
import { VtsCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { VtsCarouselTransformStrategy } from './strategies/transform-strategy';
import {
  FromToInterface,
  VtsCarouselDotPosition,
  VtsCarouselEffects,
  VtsCarouselStrategyRegistryItem,
  VTS_CAROUSEL_CUSTOM_STRATEGIES,
  PointerVector
} from './typings';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'carousel';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-carousel',
  exportAs: 'vtsCarousel',
  preserveWhitespaces: false,
  template: `
    <div
      class="slick-initialized slick-slider"
      [class.slick-vertical]="vtsDotPosition === 'left' || vtsDotPosition === 'right'"
    >
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (keydown)="onKeyDown($event)"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      <ul
        class="slick-dots"
        *ngIf="vtsDots"
        [class.slick-dots-top]="vtsDotPosition === 'top'"
        [class.slick-dots-bottom]="vtsDotPosition === 'bottom'"
        [class.slick-dots-left]="vtsDotPosition === 'left'"
        [class.slick-dots-right]="vtsDotPosition === 'right'"
      >
        <li
          *ngFor="let content of carouselContents; let i = index"
          [class.slick-active]="content.isActive"
          (click)="onLiClick(i)"
        >
          <ng-template
            [ngTemplateOutlet]="vtsDotRender || renderDotTemplate"
            [ngTemplateOutletContext]="{ $implicit: i }"
          ></ng-template>
        </li>
      </ul>
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `,
  host: {
    '[class.vts-carousel-vertical]': 'vertical',
    '[class.vts-carousel-rtl]': `dir ==='rtl'`
  }
})
export class VtsCarouselComponent
  implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges, OnInit
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsEnableSwipe: BooleanInput;
  static ngAcceptInputType_vtsDots: BooleanInput;
  static ngAcceptInputType_vtsAutoPlay: BooleanInput;
  static ngAcceptInputType_vtsAutoPlaySpeed: NumberInput;
  static ngAcceptInputType_vtsTransitionSpeed: NumberInput;

  @ContentChildren(VtsCarouselContentDirective)
  carouselContents!: QueryList<VtsCarouselContentDirective>;

  @ViewChild('slickList', { static: false }) slickList?: ElementRef;
  @ViewChild('slickTrack', { static: false }) slickTrack?: ElementRef;

  @Input() vtsDotRender?: TemplateRef<{ $implicit: number }>;
  @Input() @WithConfig() vtsEffect: VtsCarouselEffects = 'scrollx';
  @Input() @WithConfig() @InputBoolean() vtsEnableSwipe: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsDots: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsAutoPlay: boolean = false;
  @Input() @WithConfig() @InputNumber() vtsAutoPlaySpeed: number = 3000;
  @Input() @InputNumber() vtsTransitionSpeed = 500;

  /**
   * this property is passed directly to an VtsCarouselBaseStrategy
   */
  @Input() vtsStrategyOptions: VtsSafeAny = undefined;

  @Input()
  // @ts-ignore
  @WithConfig()
  set vtsDotPosition(value: VtsCarouselDotPosition) {
    this._dotPosition = value;
    if (value === 'left' || value === 'right') {
      this.vertical = true;
    } else {
      this.vertical = false;
    }
  }

  get vtsDotPosition(): VtsCarouselDotPosition {
    return this._dotPosition;
  }

  private _dotPosition: VtsCarouselDotPosition = 'bottom';

  @Output() readonly vtsBeforeChange = new EventEmitter<FromToInterface>();
  @Output() readonly vtsAfterChange = new EventEmitter<number>();

  activeIndex = 0;
  el: HTMLElement;
  slickListEl!: HTMLElement;
  slickTrackEl!: HTMLElement;
  strategy?: VtsCarouselBaseStrategy;
  vertical = false;
  transitionInProgress: number | null = null;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  private gestureRect: ClientRect | null = null;
  private pointerDelta: PointerVector | null = null;
  private isTransiting = false;
  private isDragging = false;

  constructor(
    elementRef: ElementRef,
    public readonly vtsConfigService: VtsConfigService,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    private readonly platform: Platform,
    private readonly resizeService: VtsResizeService,
    private readonly vtsDragService: VtsDragService,
    @Optional() private directionality: Directionality,
    @Optional()
    @Inject(VTS_CAROUSEL_CUSTOM_STRATEGIES)
    private customStrategies: VtsCarouselStrategyRegistryItem[]
  ) {
    this.vtsDotPosition = 'bottom';

    this.renderer.addClass(elementRef.nativeElement, 'vts-carousel');
    this.el = elementRef.nativeElement;
  }
  ngOnInit(): void {
    this.dir = this.directionality.value;

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.markContentActive(this.activeIndex);
      this.cdr.detectChanges();
    });
  }

  ngAfterContentInit(): void {
    this.markContentActive(0);
  }

  ngAfterViewInit(): void {
    this.slickListEl = this.slickList!.nativeElement;
    this.slickTrackEl = this.slickTrack!.nativeElement;

    this.carouselContents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.markContentActive(0);
      this.layout();
    });

    this.resizeService
      .subscribe()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.layout();
      });

    this.switchStrategy();
    this.markContentActive(0);
    this.layout();

    // If embedded in an entry component, it may do initial render at an inappropriate time.
    // ngZone.onStable won't do this trick
    // TODO: need to change this.
    Promise.resolve().then(() => {
      this.layout();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsEffect, vtsDotPosition } = changes;

    if (vtsEffect && !vtsEffect.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.layout();
    }

    if (vtsDotPosition && !vtsDotPosition.isFirstChange()) {
      this.switchStrategy();
      this.markContentActive(0);
      this.layout();
    }

    if (!this.vtsAutoPlay || !this.vtsAutoPlaySpeed) {
      this.clearScheduledTransition();
    } else {
      this.scheduleNextTransition();
    }
  }

  ngOnDestroy(): void {
    this.clearScheduledTransition();
    if (this.strategy) {
      this.strategy.dispose();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === LEFT_ARROW) {
      e.preventDefault();
      this.pre();
    } else if (e.keyCode === RIGHT_ARROW) {
      this.next();
      e.preventDefault();
    }
  }

  onLiClick = (index: number) => {
    if (this.dir === 'rtl') {
      this.goTo(this.carouselContents.length - 1 - index);
    } else {
      this.goTo(index);
    }
  };
  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  pre(): void {
    this.goTo(this.activeIndex - 1);
  }

  goTo(index: number): void {
    if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
      const length = this.carouselContents.length;
      const from = this.activeIndex;
      const to = (index + length) % length;
      this.isTransiting = true;
      this.vtsBeforeChange.emit({ from, to });
      this.strategy!.switch(this.activeIndex, index).subscribe(() => {
        this.scheduleNextTransition();
        this.vtsAfterChange.emit(index);
        this.isTransiting = false;
      });
      this.markContentActive(to);
      this.cdr.markForCheck();
    }
  }

  private switchStrategy(): void {
    if (this.strategy) {
      this.strategy.dispose();
    }

    // Load custom strategies first.
    const customStrategy = this.customStrategies
      ? this.customStrategies.find(s => s.name === this.vtsEffect)
      : null;
    if (customStrategy) {
      this.strategy = new (customStrategy.strategy as VtsSafeAny)(
        this,
        this.cdr,
        this.renderer,
        this.platform
      );
      return;
    }

    this.strategy =
      this.vtsEffect === 'scrollx'
        ? new VtsCarouselTransformStrategy(this, this.cdr, this.renderer, this.platform)
        : new VtsCarouselOpacityStrategy(this, this.cdr, this.renderer, this.platform);
  }

  private scheduleNextTransition(): void {
    this.clearScheduledTransition();
    if (this.vtsAutoPlay && this.vtsAutoPlaySpeed > 0 && this.platform.isBrowser) {
      this.transitionInProgress = setTimeout(() => {
        this.goTo(this.activeIndex + 1);
      }, this.vtsAutoPlaySpeed);
    }
  }

  private clearScheduledTransition(): void {
    if (this.transitionInProgress) {
      clearTimeout(this.transitionInProgress);
      this.transitionInProgress = null;
    }
  }

  private markContentActive(index: number): void {
    this.activeIndex = index;

    if (this.carouselContents) {
      this.carouselContents.forEach((slide, i) => {
        if (this.dir === 'rtl') {
          slide.isActive = index === this.carouselContents.length - 1 - i;
        } else {
          slide.isActive = index === i;
        }
      });
    }

    this.cdr.markForCheck();
  }

  /**
   * Drag carousel.
   */
  pointerDown = (event: TouchEvent | MouseEvent) => {
    if (!this.isDragging && !this.isTransiting && this.vtsEnableSwipe) {
      this.clearScheduledTransition();
      this.gestureRect = this.slickListEl.getBoundingClientRect();

      this.vtsDragService.requestDraggingSequence(event).subscribe(
        delta => {
          this.pointerDelta = delta;
          this.isDragging = true;
          this.strategy?.dragging(this.pointerDelta);
        },
        () => {},
        () => {
          if (this.vtsEnableSwipe && this.isDragging) {
            const xDelta = this.pointerDelta ? this.pointerDelta.x : 0;

            // Switch to another slide if delta is bigger than third of the width.
            if (Math.abs(xDelta) > this.gestureRect!.width / 3) {
              this.goTo(xDelta > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
            } else {
              this.goTo(this.activeIndex);
            }

            this.gestureRect = null;
            this.pointerDelta = null;
          }

          this.isDragging = false;
        }
      );
    }
  };

  layout(): void {
    if (this.strategy) {
      this.strategy.withCarouselContents(this.carouselContents);
    }
  }
}
