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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion, zoomBigMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsMenuModeType } from './menu.types';

@Component({
  selector: '[vts-submenu-none-inline-child]',
  exportAs: 'vtsSubmenuNoneInlineChild',
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion, slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #container
      [class.vts-dropdown-menu]="isMenuInsideDropDown"
      [class.vts-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.vts-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.vts-menu-sub]="!isMenuInsideDropDown"
      [class.vts-menu-rtl]="dir === 'rtl'"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
  host: {
    '[class.vts-menu-submenu]': 'true',
    '[class.vts-menu-submenu-popup]': 'true',
    '[class.vts-menu-of-horizontal]': "rootMode === 'horizontal'",
    '[class.vts-menu-of-vertical]': "rootMode === 'vertical'",
    '[class.vts-menu-submenu-placement-bottom]': "mode === 'horizontal'",
    '[class.vts-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
    '[class.vts-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
    '[class.vts-menu-submenu-rtl]': 'dir ==="rtl"',
    '[class.vts-menu-submenu-sub-level]': 'level > 1',
    '[class.vts-menu-submenu-sub-level-first]': 'isFirst',
    '[class.vts-menu-submenu-sub-level-latest]': 'isLasted',
    '[@slideMotion]': 'expandState',
    '[@zoomBigMotion]': 'expandState',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)',
    '[attr.level]': 'level'
  }
})
export class VtsSubmenuNoneInlineChildComponent implements OnDestroy, OnInit, OnChanges {
  @Input() menuClass: string = '';
  @Input() templateOutlet: TemplateRef<VtsSafeAny> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() mode: VtsMenuModeType = 'vertical';
  @Input() rootMode?: VtsMenuModeType | null;
  @Input() position = 'right';
  @Input() vtsDisabled = false;
  @Input() vtsOpen = false;
  @Input() level: number = 1;
  @Input() isFirst: boolean | null = null;
  @Input() isLasted: boolean | null = null;
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();
  @ViewChild('container')
  set containerEl(el: ElementRef) {
    if (el) el.nativeElement.classList.add('vts-menu');
  }

  constructor(@Optional() private directionality: Directionality) {}

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
