/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTree, CdkTreeNode, CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, ElementRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { VtsTreeView } from './tree';
import { VtsDestroyService } from '@ui-vts/ng-vts/core/services';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'vts-tree-node:not([builtin])',
  providers: [
    { provide: CdkTreeNodePadding, useExisting: VtsTreeNodePaddingDirective },
    VtsDestroyService
  ]
})
export class VtsTreeNodePaddingDirective<T, F> extends CdkTreeNodePadding<T> {
  override _indent = 24;
  initialIndent = 8;

  override get level(): number {
    return this._level;
  }
  override set level(value: number) {
    this._setLevelInput(value);
  }

  override get indent(): number | string {
    return this._indent;
  }
  override set indent(indent: number | string) {
    this._setIndentInput(indent);
  }

  override _paddingIndent() {
    const padding = super._paddingIndent();
    return padding !== null
      ? `${Number(padding.replace(this.indentUnits, '')) + this.initialIndent}${this.indentUnits}`
      : null;
  }

  setOptions() {
    this.indent = this.treeView.vtsShowLine ? 0 : this.treeView.vtsIndent;
    this.initialIndent = this.treeView.vtsInitialIndent;
  }

  constructor(
    _treeNode: CdkTreeNode<T, T>,
    _tree: CdkTree<T, T>,
    _element: ElementRef<HTMLElement>,
    _dir: Directionality,
    protected treeView: VtsTreeView<T, F>,
    vtsDestroyService: VtsDestroyService
  ) {
    super(_treeNode, _tree, _element, _dir);
    this.setOptions();
    this.treeView._reRenderNodes
      .pipe(takeUntil(vtsDestroyService))
      .subscribe(() => this.setOptions());
  }
}
