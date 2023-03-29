import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  disabled?: boolean;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        disabled: true,
        children: [{ name: 'leaf' }, { name: 'leaf' }]
      },
      {
        name: 'parent 1-1',
        children: [{ name: 'leaf' }]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

@Component({
  selector: 'vts-demo-tree-view-basic',
  template: `
    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource">
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-toggle vtsTreeNodeNoopToggle></vts-tree-node-toggle>
        <vts-tree-node-option
          [vtsDisabled]="node.disabled"
          [vtsSelected]="selectListSelection.isSelected(node)"
          (vtsClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle>
          <i vts-icon vtsType="ArrowMiniDown" vtsTreeNodeToggleRotateIcon></i>
        </vts-tree-node-toggle>
        <vts-tree-node-option
          [vtsDisabled]="node.disabled"
          [vtsSelected]="selectListSelection.isSelected(node)"
          (vtsClick)="selectListSelection.toggle(node)"
        >
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewBasicComponent {
  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      disabled: !!node.disabled
    };
  };
  selectListSelection = new SelectionModel<FlatNode>(true);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new VtsTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new VtsTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.setData(TREE_DATA);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
