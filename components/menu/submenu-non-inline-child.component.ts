/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion, zoomBigMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsMenuModeType, VtsMenuThemeType } from './menu.types';

@Component({
  selector: '[vts-submenu-none-inline-child]',
  exportAs: 'vtsSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion, slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.vts-dropdown-menu]="isMenuInsideDropDown"
      [class.vts-menu]="!isMenuInsideDropDown"
      [class.vts-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.vts-menu-vertical]="!isMenuInsideDropDown"
      [class.vts-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.vts-menu-sub]="!isMenuInsideDropDown"
      [class.vts-menu-rtl]="dir === 'rtl'"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
  host: {
    '[class.vts-menu-light]': "theme === 'light'",
    '[class.vts-menu-dark]': "theme === 'dark'",
    '[class.vts-menu-submenu-placement-bottom]': "mode === 'horizontal'",
    '[class.vts-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
    '[class.vts-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
    '[class.vts-menu-submenu-rtl]': 'dir ==="rtl"',
    '[@slideMotion]': 'expandState',
    '[@zoomBigMotion]': 'expandState',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class VtsSubmenuNoneInlineChildComponent implements OnDestroy, OnInit, OnChanges {
  @Input() menuClass: string = '';
  @Input() theme: VtsMenuThemeType = 'light';
  @Input() templateOutlet: TemplateRef<VtsSafeAny> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() mode: VtsMenuModeType = 'vertical';
  @Input() position = 'right';
  @Input() vtsDisabled = false;
  @Input() vtsOpen = false;
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-menu-submenu', 'vts-menu-submenu-popup');
  }

  setMouseState(state: boolean): void {
    if (!this.vtsDisabled) {
      this.subMenuMouseState.next(state);
    }
  }
  expandState = 'collapsed';
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  calcMotionState(): void {
    if (this.vtsOpen) {
      if (this.mode === 'horizontal') {
        this.expandState = 'bottom';
      } else if (this.mode === 'vertical') {
        this.expandState = 'active';
      }
    } else {
      this.expandState = 'collapsed';
    }
  }
  ngOnInit(): void {
    this.calcMotionState();

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { mode, vtsOpen } = changes;
    if (mode || vtsOpen) {
      this.calcMotionState();
    }
  }
}
