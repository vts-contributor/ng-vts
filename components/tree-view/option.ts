/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { VtsTreeNodeComponent } from './node';

@Component({
  selector: 'vts-tree-node-option',
  template: `
    <span class="vts-tree-title"><ng-content></ng-content></span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'vts-tree-node-content-wrapper',
    '[class.vts-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.vts-tree-node-selected]': 'vtsSelected',
    '(click)': 'onClick($event)'
  }
})
export class VtsTreeNodeOptionComponent<T, F> {
  @Output() readonly vtsClick = new EventEmitter<MouseEvent>();

  constructor(private treeNode: VtsTreeNodeComponent<T, F>) {}

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  get disabled() {
    return this.treeNode.vtsDisabled;
  }

  onClick(e: MouseEvent): void {
    if (!this.disabled) {
      this.vtsClick.emit(e);
    }
  }
}
