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

import { VtsTreeVirtualNodeData } from './node';
import { VtsTreeNodeOutletDirective } from './outlet';

import { VtsTreeView } from './tree';
import { VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';

const SIZE: { [k in VtsSizeLMSType]: number } = {
  sm: 32,
  md: 40,
  lg: 48
};

const DEFAULT_SIZE = SIZE.md;

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
    '[class.vts-tree-sm]': 'vtsSize === "sm"',
    '[class.vts-tree-md]': 'vtsSize === "md"',
    '[class.vts-tree-lg]': 'vtsSize === "lg"',
    '[class.vts-tree-show-line]': `vtsShowLine`,
    '[class.vts-tree-rtl]': `dir === 'rtl'`
  }
})
export class VtsTreeVirtualScrollViewComponent<T, F>
  extends VtsTreeView<T, F>
  implements OnChanges
{
  itemSize = DEFAULT_SIZE;

  @ViewChild(VtsTreeNodeOutletDirective, { static: true })
  readonly nodeOutlet!: VtsTreeNodeOutletDirective;
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  readonly virtualScrollViewport!: CdkVirtualScrollViewport;

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

  override ngOnChanges(changes: SimpleChanges): void {
    const { vtsSize } = changes;
    const size = SIZE[vtsSize.currentValue as VtsSizeLMSType];
    this.itemSize = size;
    this.vtsMinBufferPx = this.itemSize * 5;
    this.vtsMaxBufferPx = this.itemSize * 10;
  }
}
