/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CdkTree, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { warnDeprecation } from '@ui-vts/ng-vts/core/logger';

import { VtsTreeVirtualNodeData } from './node';
import { VtsTreeNodeOutletDirective } from './outlet';

import { VtsTreeView } from './tree';

const DEFAULT_SIZE = 28;

@Component({
  selector: 'vts-tree-virtual-scroll-view',
  exportAs: 'vtsTreeVirtualScrollView',
  template: `
    <div class="vts-tree-list">
      <cdk-virtual-scroll-viewport
        class="vts-tree-list-holder"
        [itemSize]="itemSize"
        [minBufferPx]="vtsMinBufferPx"
        [maxBufferPx]="vtsMaxBufferPx"
      >
        <ng-container *cdkVirtualFor="let item of nodes; let i = index">
          <ng-template vtsTreeVirtualScrollNodeOutlet [data]="item"></ng-template>
        </ng-container>
      </cdk-virtual-scroll-viewport>
    </div>
    <ng-container vtsTreeNodeOutlet></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: VtsTreeView, useExisting: VtsTreeVirtualScrollViewComponent },
    { provide: CdkTree, useExisting: VtsTreeVirtualScrollViewComponent }
  ],
  host: {
    class: 'vts-tree',
    '[class.vts-tree-block-node]': 'vtsDirectoryTree || vtsBlockNode',
    '[class.vts-tree-directory]': 'vtsDirectoryTree',
    '[class.vts-tree-rtl]': `dir === 'rtl'`
  }
})
export class VtsTreeVirtualScrollViewComponent<T> extends VtsTreeView<T> implements OnChanges {
  itemSize = DEFAULT_SIZE;

  @ViewChild(VtsTreeNodeOutletDirective, { static: true })
  readonly nodeOutlet!: VtsTreeNodeOutletDirective;
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  readonly virtualScrollViewport!: CdkVirtualScrollViewport;

  /**
   * @deprecated use `vtsItemSize` instead
   * @breaking-change 12.0.0
   */
  @Input() vtsNodeWidth = DEFAULT_SIZE;

  @Input() vtsItemSize = DEFAULT_SIZE;
  @Input() vtsMinBufferPx = DEFAULT_SIZE * 5;
  @Input() vtsMaxBufferPx = DEFAULT_SIZE * 10;

  nodes: Array<VtsTreeVirtualNodeData<T>> = [];

  override renderNodeChanges(data: T[] | ReadonlyArray<T>): void {
    this.nodes = new Array(...data).map((n, i) => this.createNode(n, i));
  }

  private createNode(nodeData: T, index: number): VtsTreeVirtualNodeData<T> {
    const node = this._getNodeDef(nodeData, index);
    const context = new CdkTreeNodeOutletContext<T>(nodeData);
    if (this.treeControl.getLevel) {
      context.level = this.treeControl.getLevel(nodeData);
    } else {
      context.level = 0;
    }
    return {
      data: nodeData,
      context,
      nodeDef: node
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsNodeWidth, vtsItemSize } = changes;
    if (vtsNodeWidth) {
      warnDeprecation(
        '`vtsNodeWidth` in vts-tree-virtual-scroll-view will be removed in 12.0.0, please use `vtsItemSize` instead.'
      );
      this.itemSize = vtsNodeWidth.currentValue;
    }
    if (vtsItemSize) {
      this.itemSize = vtsItemSize.currentValue;
    }
  }
}
