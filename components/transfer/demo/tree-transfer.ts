import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { VtsTreeNode, VtsTreeNodeOptions } from '@ui-vts/ng-vts/core/tree';
import { TransferChange } from '@ui-vts/ng-vts/transfer';
import { VtsTreeComponent } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-transfer-tree-transfer',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsShowSelectAll]="false"
      [vtsRenderList]="[leftRenderList, null]"
      (vtsChange)="change($event)"
    >
      <ng-template
        #leftRenderList
        let-items
        let-onItemSelectAll="onItemSelectAll"
        let-onItemSelect="onItemSelect"
      >
        <vts-tree #tree [vtsData]="treeData" vtsExpandAll vtsBlockNode>
          <ng-template #vtsTreeTemplate let-node>
            <span
              class="vts-tree-checkbox"
              [class.vts-tree-checkbox-disabled]="node.isDisabled"
              [class.vts-tree-checkbox-checked]="node.isChecked"
              (click)="checkBoxChange(node, onItemSelect)"
            >
              <span class="vts-tree-checkbox-inner"></span>
            </span>
            <span
              (click)="checkBoxChange(node, onItemSelect)"
              class="vts-tree-node-content-wrapper vts-tree-node-content-wrapper-open"
            >
              {{ node.title }}
            </span>
          </ng-template>
        </vts-tree>
      </ng-template>
    </vts-transfer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsDemoTransferTreeTransferComponent {
  @ViewChild('tree', { static: true }) tree!: VtsTreeComponent;
  list: VtsTreeNodeOptions[] = [
    { key: '1', id: 1, parentid: 0, title: 'parent 1' },
    {
      key: '2',
      id: 2,
      parentid: 1,
      title: 'leaf 1-1',
      disabled: true,
      isLeaf: true
    },
    { key: '3', id: 3, parentid: 1, title: 'leaf 1-2', isLeaf: true }
  ];
  treeData = this.generateTree(this.list);
  checkedNodeList: VtsTreeNode[] = [];

  private generateTree(arr: VtsTreeNodeOptions[]): VtsTreeNodeOptions[] {
    const tree: VtsTreeNodeOptions[] = [];
    // tslint:disable-next-line:no-any
    const mappedArr: any = {};
    let arrElem: VtsTreeNodeOptions;
    let mappedElem: VtsTreeNodeOptions;

    for (let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = { ...arrElem };
      mappedArr[arrElem.id].children = [];
    }

    for (const id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        if (mappedElem.parentid) {
          mappedArr[mappedElem.parentid].children.push(mappedElem);
        } else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  checkBoxChange(node: VtsTreeNode, onItemSelect: (item: VtsTreeNodeOptions) => void): void {
    if (node.isDisabled) {
      return;
    }
    node.isChecked = !node.isChecked;
    if (node.isChecked) {
      this.checkedNodeList.push(node);
    } else {
      const idx = this.checkedNodeList.indexOf(node);
      if (idx !== -1) {
        this.checkedNodeList.splice(idx, 1);
      }
    }
    const item = this.list.find(w => w.id === node.origin.id);
    onItemSelect(item!);
  }

  change(ret: TransferChange): void {
    const isDisabled = ret.to === 'right';
    this.checkedNodeList.forEach(node => {
      node.isDisabled = isDisabled;
      node.isChecked = isDisabled;
    });
  }
}
