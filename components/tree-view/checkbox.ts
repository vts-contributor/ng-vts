/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'vts-tree-node-checkbox:not([builtin])',
  template: `
    <span class="vts-tree-checkbox-inner"></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'vts-tree-checkbox',
    '[class.vts-tree-checkbox-checked]': `vtsChecked`,
    '[class.vts-tree-checkbox-indeterminate]': `vtsIndeterminate`,
    '[class.vts-tree-checkbox-disabled]': `vtsDisabled`,
    '(click)': 'onClick($event)'
  }
})
export class VtsTreeNodeCheckboxComponent {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsChecked?: boolean;
  @Input() vtsIndeterminate?: boolean;
  @Input() @InputBoolean() vtsDisabled?: boolean;
  @Output() readonly vtsClick = new EventEmitter<MouseEvent>();

  onClick(e: MouseEvent): void {
    if (!this.vtsDisabled) {
      this.vtsClick.emit(e);
    }
  }
}
