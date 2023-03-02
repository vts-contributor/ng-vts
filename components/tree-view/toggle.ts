/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: 'vts-tree-node-toggle[vtsTreeNodeNoopToggle], [vtsTreeNodeNoopToggle]',
  host: {
    class: 'vts-tree-switcher vts-tree-switcher-noop'
  }
})
export class VtsTreeNodeNoopToggleDirective {}

@Directive({
  selector: 'vts-tree-node-toggle:not([vtsTreeNodeNoopToggle]), [vtsTreeNodeToggle]',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: VtsTreeNodeToggleDirective }],
  host: {
    class: 'vts-tree-switcher',
    '[class.vts-tree-switcher_open]': 'isExpanded',
    '[class.vts-tree-switcher_close]': '!isExpanded'
  }
})
export class VtsTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
  static ngAcceptInputType_recursive: BooleanInput;
  @Input('vtsTreeNodeToggleRecursive')
  override get recursive(): boolean {
    return this._recursive;
  }
  override set recursive(value: boolean) {
    this._recursive = coerceBooleanProperty(value);
  }

  get isExpanded(): boolean {
    return this._treeNode.isExpanded;
  }
}

@Directive({
  selector: '[vts-icon][vtsTreeNodeToggleRotateIcon]',
  host: {
    class: 'vts-tree-switcher-icon'
  }
})
export class VtsTreeNodeToggleRotateIconDirective {}

@Directive({
  selector: '[vts-icon][vtsTreeNodeToggleActiveIcon]',
  host: {
    class: 'vts-tree-switcher-loading-icon'
  }
})
export class VtsTreeNodeToggleActiveIconDirective {}
