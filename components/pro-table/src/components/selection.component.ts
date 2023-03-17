/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-protable-selection',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label
      *ngIf="showCheckbox"
      vts-checkbox
      [class.vts-protable-selection-select-all-custom]="showRowSelection"
      [ngModel]="checked"
      [vtsDisabled]="disabled"
      [vtsIndeterminate]="indeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <div class="vts-protable-selection-extra" *ngIf="showRowSelection">
      <span
        vts-dropdown
        class="vts-protable-selection-down"
        vtsPlacement="bottomLeft"
        [vtsDropdownMenu]="selectionMenu"
      >
        <i vts-icon vtsType="ArrowMiniDown"></i>
      </span>
      <vts-dropdown-menu #selectionMenu="vtsDropdownMenu">
        <ul vts-menu class="vts-protable-selection-menu">
          <li
            vts-menu-item
            *ngFor="let selection of listOfSelections"
            (click)="selection.onSelect()"
          >
            {{ selection.text }}
          </li>
        </ul>
      </vts-dropdown-menu>
    </div>
  `
})
export class VtsProTableSelectionComponent {
  @Input() listOfSelections: Array<{
    text: string;
    onSelect(...args: VtsSafeAny[]): VtsSafeAny;
  }> = [];
  @Input() checked = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() showCheckbox = false;
  @Input() showRowSelection = false;
  @Output() readonly checkedChange = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-selection');
  }

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this.checkedChange.emit(checked);
  }
}
