/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsMenuModeType } from './menu.types';

@Component({
  selector: '[vts-submenu-title]',
  exportAs: 'vtsSubmenuTitle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i vts-icon [vtsType]="vtsIcon" *ngIf="vtsIcon"></i>
    <ng-container *vtsStringTemplateOutlet="vtsTitle">
      <span>{{ vtsTitle }}</span>
    </ng-container>
    <ng-content></ng-content>
    <span
      [ngSwitch]="dir"
      *ngIf="isMenuInsideDropDown; else notDropdownTpl"
      class="vts-dropdown-menu-submenu-expand-icon"
    >
      <i
        *ngSwitchCase="'rtl'"
        vts-icon
        vtsType="ChevronLeft"
        class="vts-dropdown-menu-submenu-arrow-icon"
      ></i>
      <i
        *ngSwitchDefault
        vts-icon
        vtsType="ChevronRight"
        class="vts-dropdown-menu-submenu-arrow-icon"
      ></i>
    </span>
    <ng-template #notDropdownTpl>
      <i class="vts-menu-submenu-arrow"></i>
    </ng-template>
  `,
  host: {
    '[class.vts-dropdown-menu-submenu-title]': 'isMenuInsideDropDown',
    '[class.vts-menu-submenu-title]': '!isMenuInsideDropDown',
    '[style.marginLeft.px]': `dir === 'rtl' ? null : marginLeft `,
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class VtsSubMenuTitleComponent implements OnDestroy, OnInit {
  @Input() vtsIcon: string | null = null;
  @Input() vtsTitle: string | TemplateRef<void> | null = null;
  @Input() isMenuInsideDropDown = false;
  @Input() vtsDisabled = false;
  @Input() marginLeft: number | null = null;
  @Input() mode: VtsMenuModeType = 'vertical';
  @Output() readonly toggleSubMenu = new EventEmitter();
  @Output() readonly subMenuMouseState = new EventEmitter<boolean>();

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, @Optional() private directionality: Directionality) {}
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setMouseState(state: boolean): void {
    if (!this.vtsDisabled) {
      this.subMenuMouseState.next(state);
    }
  }
  clickTitle(): void {
    if (this.mode === 'inline' && !this.vtsDisabled) {
      this.toggleSubMenu.emit();
    }
  }
}
