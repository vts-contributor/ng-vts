/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

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
export class VtsTreeNodeOptionComponent<T> implements OnChanges {
  static ngAcceptInputType_vtsSelected: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() @InputBoolean() vtsSelected = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Output() readonly vtsClick = new EventEmitter<MouseEvent>();

  constructor(private treeNode: VtsTreeNodeComponent<T>) {}

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  onClick(e: MouseEvent): void {
    if (!this.vtsDisabled) {
      this.vtsClick.emit(e);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsDisabled, vtsSelected } = changes;
    if (vtsDisabled) {
      if (vtsDisabled.currentValue) {
        this.treeNode.disable();
      } else {
        this.treeNode.enable();
      }
    }

    if (vtsSelected) {
      if (vtsSelected.currentValue) {
        this.treeNode.select();
      } else {
        this.treeNode.deselect();
      }
    }
  }
}
