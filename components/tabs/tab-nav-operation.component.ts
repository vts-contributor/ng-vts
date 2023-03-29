/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsTabNavItemDirective } from './tab-nav-item.directive';

@Component({
  selector: 'vts-tab-nav-operation',
  exportAs: 'vtsTabNavOperation',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      vts-dropdown
      class="vts-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      vtsOverlayClassName="vts-tabs-dropdown"
      #dropdownTrigger="vtsDropdown"
      [vtsDropdownMenu]="menu"
      [vtsOverlayStyle]="{ minWidth: '46px' }"
      [vtsMatchWidthElement]="null"
      (vtsVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <i vts-icon vtsType="ViewHeadline"></i>
    </button>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu *ngIf="menuOpened">
        <li
          vts-menu-item
          *ngFor="let item of items"
          class="vts-tabs-dropdown-menu-item"
          [class.vts-tabs-dropdown-menu-item-disabled]="item.disabled"
          [vtsSelected]="item.active"
          [vtsDisabled]="item.disabled"
          (click)="onSelect(item)"
          (contextmenu)="onContextmenu(item, $event)"
        >
          <ng-container *vtsStringTemplateOutlet="item.tab.label; context: { visible: false }">
            {{ item.tab.label }}
          </ng-container>
        </li>
      </ul>
    </vts-dropdown-menu>
    <button
      *ngIf="addable"
      vts-tab-add-button
      [addIcon]="addIcon"
      (click)="addClicked.emit()"
    ></button>
  `,
  host: {
    class: 'vts-tabs-nav-operations',
    '[class.vts-tabs-nav-operations-hidden]': 'items.length === 0'
  }
})
export class VtsTabNavOperationComponent implements OnDestroy {
  @Input() items: VtsTabNavItemDirective[] = [];
  @Input() addable: boolean = false;
  @Input() addIcon: string | TemplateRef<VtsSafeAny> = 'plus';

  @Output() readonly addClicked = new EventEmitter<void>();
  @Output() readonly selected = new EventEmitter<VtsTabNavItemDirective>();
  closeAnimationWaitTimeoutId: number | ReturnType<typeof setTimeout> = -1;
  menuOpened = false;

  private readonly element: HTMLElement;
  constructor(public cdr: ChangeDetectorRef, private elementRef: ElementRef<HTMLElement>) {
    this.element = this.elementRef.nativeElement;
  }

  onSelect(item: VtsTabNavItemDirective): void {
    if (!item.disabled) {
      // ignore vtsCanDeactivate
      item.tab.vtsClick.emit();
      this.selected.emit(item);
    }
  }

  onContextmenu(item: VtsTabNavItemDirective, e: MouseEvent): void {
    if (!item.disabled) {
      item.tab.vtsContextmenu.emit(e);
    }
  }
  showItems(): void {
    clearTimeout(this.closeAnimationWaitTimeoutId);
    this.menuOpened = true;
    this.cdr.markForCheck();
  }

  menuVisChange(visible: boolean): void {
    if (!visible) {
      this.closeAnimationWaitTimeoutId = setTimeout(() => {
        this.menuOpened = false;
        this.cdr.markForCheck();
      }, 150);
    }
  }

  getElementWidth(): number {
    return this.element?.offsetWidth || 0;
  }

  getElementHeight(): number {
    return this.element?.offsetHeight || 0;
  }

  ngOnDestroy(): void {
    clearTimeout(this.closeAnimationWaitTimeoutId);
  }
}
