/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsTreeNodeComponent } from './node';

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
export class VtsTreeNodeCheckboxComponent<T, F> {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsChecked?: boolean;
  @Input() vtsIndeterminate?: boolean;
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Output() readonly vtsClick = new EventEmitter<MouseEvent>();

  constructor(private treeNode: VtsTreeNodeComponent<T, F>) {}

  get disabled() {
    return this.vtsDisabled || this.treeNode.vtsDisabled;
  }

  onClick(e: MouseEvent): void {
    if (!this.disabled) {
      this.vtsClick.emit(e);
    }
  }
}
