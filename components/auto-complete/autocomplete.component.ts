/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { BooleanInput, CompareWith, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  VtsAutocompleteOptionComponent,
  VtsOptionSelectionChange
} from './autocomplete-option.component';

export interface AutocompleteDataSourceItem {
  value: string;
  label: string;
}

export type AutocompleteDataSource = Array<AutocompleteDataSourceItem | string | number>;

@Component({
  selector: 'vts-autocomplete',
  exportAs: 'vtsAutocomplete',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template>
      <div
        #panel
        class="vts-select-dropdown vts-select-dropdown-placement-bottomLeft"
        [class.vts-select-dropdown-hidden]="!showPanel"
        [class.vts-select-dropdown-rtl]="dir === 'rtl'"
        [ngClass]="vtsOverlayClassName"
        [ngStyle]="vtsOverlayStyle"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="noAnimation?.vtsNoAnimation"
      >
        <div style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
          <div style="display: flex; flex-direction: column;">
            <ng-template
              *ngTemplateOutlet="vtsDataSource ? optionsTemplate : contentTemplate"
            ></ng-template>
          </div>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        <vts-auto-option
          *ngFor="let option of vtsDataSource!"
          [vtsValue]="option"
          [vtsLabel]="option && $any(option).label ? $any(option).label : $any(option)"
        >
          {{ option && $any(option).label ? $any(option).label : $any(option) }}
        </vts-auto-option>
      </ng-template>
    </ng-template>
  `,
  animations: [slideMotion]
})
export class VtsAutocompleteComponent
  implements AfterContentInit, AfterViewInit, OnDestroy, OnInit
{
  static ngAcceptInputType_vtsDefaultActiveFirstOption: BooleanInput;
  static ngAcceptInputType_vtsBackfill: BooleanInput;

  @Input() vtsWidth?: number;
  @Input() vtsOverlayClassName = '';
  @Input() vtsOverlayStyle: { [key: string]: string } = {};
  @Input() @InputBoolean() vtsDefaultActiveFirstOption = true;
  @Input() @InputBoolean() vtsBackfill = false;
  @Input() vtsCustomCompareFn: CompareWith = (o1, o2) => o1 === o2;
  @Input() vtsDataSource?: AutocompleteDataSource;
  @Output()
  readonly selectionChange: EventEmitter<VtsAutocompleteOptionComponent> = new EventEmitter<VtsAutocompleteOptionComponent>();

  showPanel: boolean = true;
  isOpen: boolean = false;
  activeItem!: VtsAutocompleteOptionComponent;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  animationStateChange = new EventEmitter<AnimationEvent>();

  /**
   * Options accessor, its source may be content or dataSource
   */
  get options(): QueryList<VtsAutocompleteOptionComponent> {
    // first dataSource
    if (this.vtsDataSource) {
      return this.fromDataSourceOptions;
    } else {
      return this.fromContentOptions;
    }
  }

  /** Provided by content */
  @ContentChildren(VtsAutocompleteOptionComponent, { descendants: true })
  fromContentOptions!: QueryList<VtsAutocompleteOptionComponent>;
  /** Provided by dataSource */
  @ViewChildren(VtsAutocompleteOptionComponent)
  fromDataSourceOptions!: QueryList<VtsAutocompleteOptionComponent>;

  /** cdk-overlay */
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<{}>;
  @ViewChild('panel', { static: false }) panel?: ElementRef;
  @ViewChild('content', { static: false }) content?: ElementRef;

  private activeItemIndex: number = -1;
  private selectionChangeSubscription = Subscription.EMPTY;
  private optionMouseEnterSubscription = Subscription.EMPTY;
  private dataSourceChangeSubscription = Subscription.EMPTY;
  /** Options changes listener */
  readonly optionSelectionChanges: Observable<VtsOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge<VtsOptionSelectionChange>(...this.options.map(option => option.selectionChange));
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.optionSelectionChanges)
    );
  });
  readonly optionMouseEnter: Observable<VtsAutocompleteOptionComponent> = defer(() => {
    if (this.options) {
      return merge<VtsAutocompleteOptionComponent>(
        ...this.options.map(option => option.mouseEntered)
      );
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.optionMouseEnter)
    );
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {}
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.changeDetectorRef.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  onAnimationEvent(event: AnimationEvent): void {
    this.animationStateChange.emit(event);
  }

  ngAfterContentInit(): void {
    if (!this.vtsDataSource) {
      this.optionsInit();
    }
  }

  ngAfterViewInit(): void {
    if (this.vtsDataSource) {
      this.optionsInit();
    }
  }

  ngOnDestroy(): void {
    this.dataSourceChangeSubscription.unsubscribe();
    this.selectionChangeSubscription.unsubscribe();
    this.optionMouseEnterSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  setVisibility(): void {
    this.showPanel = !!this.options.length;
    this.changeDetectorRef.markForCheck();
  }

  setActiveItem(index: number): void {
    const activeItem = this.options.toArray()[index];
    if (activeItem && !activeItem.active) {
      this.activeItem = activeItem;
      this.activeItemIndex = index;
      this.clearSelectedOptions(this.activeItem);
      this.activeItem.setActiveStyles();
      this.changeDetectorRef.markForCheck();
    }
  }

  setNextItemActive(): void {
    const nextIndex =
      this.activeItemIndex + 1 <= this.options.length - 1 ? this.activeItemIndex + 1 : 0;
    this.setActiveItem(nextIndex);
  }

  setPreviousItemActive(): void {
    const previousIndex =
      this.activeItemIndex - 1 < 0 ? this.options.length - 1 : this.activeItemIndex - 1;
    this.setActiveItem(previousIndex);
  }

  getOptionIndex(value: VtsSafeAny): number {
    return this.options.reduce(
      (result: number, current: VtsAutocompleteOptionComponent, index: number) => {
        return result === -1
          ? this.vtsCustomCompareFn(value, current.vtsValue)
            ? index
            : -1
          : result;
      },
      -1
    )!;
  }

  getOption(value: VtsSafeAny): VtsAutocompleteOptionComponent | null {
    return this.options.find(item => this.vtsCustomCompareFn(value, item.vtsValue)) || null;
  }

  private optionsInit(): void {
    this.setVisibility();
    this.subscribeOptionChanges();
    const changes = this.vtsDataSource
      ? this.fromDataSourceOptions.changes
      : this.fromContentOptions.changes;
    // async
    this.dataSourceChangeSubscription = changes.subscribe(e => {
      if (!e.dirty && this.isOpen) {
        setTimeout(() => this.setVisibility());
      }
      this.subscribeOptionChanges();
    });
  }

  /**
   * Clear the status of options
   */
  clearSelectedOptions(
    skip?: VtsAutocompleteOptionComponent | null,
    deselect: boolean = false
  ): void {
    this.options.forEach(option => {
      if (option !== skip) {
        if (deselect) {
          option.deselect();
        }
        option.setInactiveStyles();
      }
    });
  }

  private subscribeOptionChanges(): void {
    this.selectionChangeSubscription.unsubscribe();
    this.selectionChangeSubscription = this.optionSelectionChanges
      .pipe(filter((event: VtsOptionSelectionChange) => event.isUserInput))
      .subscribe((event: VtsOptionSelectionChange) => {
        event.source.select();
        event.source.setActiveStyles();
        this.activeItem = event.source;
        this.activeItemIndex = this.getOptionIndex(this.activeItem.vtsValue);
        this.clearSelectedOptions(event.source, true);
        this.selectionChange.emit(event.source);
      });

    this.optionMouseEnterSubscription.unsubscribe();
    this.optionMouseEnterSubscription = this.optionMouseEnter.subscribe(
      (event: VtsAutocompleteOptionComponent) => {
        event.setActiveStyles();
        this.activeItem = event;
        this.activeItemIndex = this.getOptionIndex(this.activeItem.vtsValue);
        this.clearSelectedOptions(event);
      }
    );
  }
}
