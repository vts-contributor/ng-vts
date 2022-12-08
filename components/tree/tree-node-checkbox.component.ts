/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vts-tree-node-checkbox[builtin]',
  template: `
    <span
      [class.vts-tree-checkbox-inner]="!vtsSelectMode"
      [class.vts-select-tree-checkbox-inner]="vtsSelectMode"
    ></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.vts-select-tree-checkbox]': `vtsSelectMode`,
    '[class.vts-select-tree-checkbox-checked]': `vtsSelectMode && isChecked`,
    '[class.vts-select-tree-checkbox-indeterminate]': `vtsSelectMode && isHalfChecked`,
    '[class.vts-select-tree-checkbox-disabled]': `vtsSelectMode && (isDisabled || isDisableCheckbox)`,
    '[class.vts-tree-checkbox]': `!vtsSelectMode`,
    '[class.vts-tree-checkbox-checked]': `!vtsSelectMode && isChecked`,
    '[class.vts-tree-checkbox-indeterminate]': `!vtsSelectMode && isHalfChecked`,
    '[class.vts-tree-checkbox-disabled]': `!vtsSelectMode && (isDisabled || isDisableCheckbox)`
  }
})
export class VtsTreeNodeBuiltinCheckboxComponent {
  @Input() vtsSelectMode = false;
  @Input() isChecked?: boolean;
  @Input() isHalfChecked?: boolean;
  @Input() isDisabled?: boolean;
  @Input() isDisableCheckbox?: boolean;
}
