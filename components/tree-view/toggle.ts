/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTree, CdkTreeNode, CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { VtsTreeNodeComponent } from './node';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'vts-tree-node-toggle',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: VtsTreeNodeToggleDirective }],
  host: {
    class: 'vts-tree-switcher',
    '[class.vts-tree-switcher_open]': 'isExpanded',
    '[class.vts-tree-switcher_close]': '!isExpanded',
    '[class.vts-tree-switcher-disabled]': 'vtsDisabled'
  },
  template: `
    <ng-container *ngIf="vtsCaret || vtsLoading; else default">
      <ng-container *ngIf="vtsCaret">
        <ng-container *ngTemplateOutlet="caret"></ng-container>
      </ng-container>
      <ng-container *ngIf="vtsLoading">
        <ng-container *ngTemplateOutlet="loading"></ng-container>
      </ng-container>
    </ng-container>

    <ng-template #caret>
      <i class="vts-tree-switcher-icon" vts-icon vtsType="CaretDownFill:bootstrap"></i>
    </ng-template>

    <ng-template #loading>
      <i vts-icon vtsType="BxLoaderAlt:boxIcon" vtsSpin class="vts-tree-switcher-loading-icon"></i>
    </ng-template>

    <ng-template #default>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class VtsTreeNodeToggleDirective<T, F> extends CdkTreeNodeToggle<T> {
  static ngAcceptInputType_vtsNoop: BooleanInput;
  static ngAcceptInputType_vtsCaret: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_recursive: BooleanInput;

  @Input() @InputBoolean() vtsNoop: boolean = false;
  @Input() @InputBoolean() vtsCaret: boolean = false;
  @Input() @InputBoolean() vtsLoading: boolean = false;
  @Input() @InputBoolean() vtsDisabled: boolean = false;

  @Input('vtsRecursive')
  @InputBoolean()
  override get recursive(): boolean {
    return this._recursive;
  }
  override set recursive(value: boolean) {
    this._recursive = coerceBooleanProperty(value);
  }

  get isExpanded(): boolean {
    return this._treeNode.isExpanded;
  }

  get disabled() {
    return this.vtsDisabled || this.treeNode.vtsDisabled;
  }

  constructor(
    _tree: CdkTree<T, T>,
    _treeNode: CdkTreeNode<T, T>,
    private treeNode: VtsTreeNodeComponent<T, F>
  ) {
    super(_tree, _treeNode);
  }

  override _toggle(event: Event): void {
    if (!this.vtsNoop && !this.disabled) super._toggle(event);
  }
}
