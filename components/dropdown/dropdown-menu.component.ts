/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { IndexableObject, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { MenuService, VtsIsMenuInsideDropDownToken } from '@ui-vts/ng-vts/menu';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type VtsPlacementType =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';

@Component({
  selector: `vts-dropdown-menu`,
  exportAs: `vtsDropdownMenu`,
  animations: [slideMotion],
  providers: [
    MenuService,
    /** menu is inside dropdown-menu component **/
    {
      provide: VtsIsMenuInsideDropDownToken,
      useValue: true
    }
  ],
  template: `
    <ng-template>
      <div
        class="vts-dropdown"
        [class.vts-dropdown-rtl]="dir === 'rtl'"
        [ngClass]="vtsOverlayClassName"
        [ngStyle]="vtsOverlayStyle"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsDropdownMenuComponent implements AfterContentInit, OnDestroy, OnInit {
  mouseState$ = new BehaviorSubject<boolean>(false);
  isChildSubMenuOpen$ = this.vtsMenuService.isChildSubMenuOpen$;
  descendantMenuItemClick$ = this.vtsMenuService.descendantMenuItemClick$;
  animationStateChange$ = new EventEmitter<AnimationEvent>();
  vtsOverlayClassName: string = '';
  vtsOverlayStyle: IndexableObject = {};
  @ViewChild(TemplateRef, { static: true })
  templateRef!: TemplateRef<VtsSafeAny>;

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  onAnimationEvent(event: AnimationEvent): void {
    this.animationStateChange$.emit(event);
  }

  setMouseState(visible: boolean): void {
    this.mouseState$.next(visible);
  }

  setValue<T extends keyof VtsDropdownMenuComponent>(key: T, value: this[T]): void {
    this[key] = value;
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public viewContainerRef: ViewContainerRef,
    public vtsMenuService: MenuService,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {}
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    this.renderer.removeChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      this.elementRef.nativeElement
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
