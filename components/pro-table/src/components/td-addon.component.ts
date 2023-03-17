/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector:
    'td[vtsChecked], td[vtsDisabled], td[vtsIndeterminate], td[vtsIndentSize], td[vtsExpand], td[vtsShowExpand], td[vtsShowCheckbox]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="vtsShowExpand || vtsIndentSize > 0">
      <vts-row-indent [indentSize]="vtsIndentSize"></vts-row-indent>
      <button
        vts-row-expand-button
        [expand]="vtsExpand"
        (expandChange)="onExpandChange($event)"
        [spaceMode]="!vtsShowExpand"
        [expandTemplate]="vtsExpandTemplate"
      ></button>
    </ng-container>
    <label
      vts-checkbox
      *ngIf="vtsShowCheckbox"
      [vtsDisabled]="vtsDisabled"
      [ngModel]="vtsChecked"
      [vtsIndeterminate]="vtsIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-protable-cell-with-append]': `vtsShowExpand || vtsIndentSize > 0`,
    '[class.vts-protable-selection-column]': `vtsShowCheckbox`
  }
})
export class VtsTdAddOnComponent implements OnChanges {
  static ngAcceptInputType_vtsShowExpand: BooleanInput;
  static ngAcceptInputType_vtsShowCheckbox: BooleanInput;
  static ngAcceptInputType_vtsExpand: BooleanInput;

  @Input() vtsChecked = false;
  @Input() vtsDisabled = false;
  @Input() vtsIndeterminate = false;
  @Input() vtsIndentSize = 0;
  @Input() @InputBoolean() vtsShowExpand = false;
  @Input() @InputBoolean() vtsShowCheckbox = false;
  @Input() @InputBoolean() vtsExpand = false;
  @Input() vtsExpandTemplate: TemplateRef<{
    $implicit: boolean;
  }> | null = null;

  @Output() readonly vtsCheckedChange = new EventEmitter<boolean>();
  @Output() readonly vtsExpandChange = new EventEmitter<boolean>();
  private isVtsShowExpandChanged = false;
  private isVtsShowCheckboxChanged = false;

  onCheckedChange(checked: boolean): void {
    this.vtsChecked = checked;
    this.vtsCheckedChange.emit(checked);
  }

  onExpandChange(expand: boolean): void {
    this.vtsExpand = expand;
    this.vtsExpandChange.emit(expand);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = (value: SimpleChange) =>
      value && value.firstChange && value.currentValue !== undefined;
    const { vtsExpand, vtsChecked, vtsShowExpand, vtsShowCheckbox } = changes;
    if (vtsShowExpand) {
      this.isVtsShowExpandChanged = true;
    }
    if (vtsShowCheckbox) {
      this.isVtsShowCheckboxChanged = true;
    }
    if (isFirstChange(vtsExpand) && !this.isVtsShowExpandChanged) {
      this.vtsShowExpand = true;
    }
    if (isFirstChange(vtsChecked) && !this.isVtsShowCheckboxChanged) {
      this.vtsShowCheckbox = true;
    }
  }
}
