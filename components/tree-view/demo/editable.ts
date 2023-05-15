import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  key: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    key: '1',
    children: [
      {
        name: 'parent 1-0',
        key: '1-0',
        children: [
          { name: 'leaf', key: '1-0-0' },
          { name: 'leaf', key: '1-0-1' }
        ]
      },
      {
        name: 'parent 1-1',
        key: '1-1',
        children: [{ name: 'leaf', key: '1-1-0' }]
      }
    ]
  },
  {
    key: '2',
    name: 'parent 2',
    children: [{ name: 'leaf', key: '2-0' }]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  key: string;
  level: number;
}

@Component({
  selector: 'vts-demo-tree-view-editable',
  template: `
    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource" [trackBy]="trackBy">
      <vts-tree-node
        *vtsTreeNodeDef="let node"
        [vtsSelected]="selectListSelection.isSelected(node)"
        (vtsClick)="selectListSelection.toggle(node)"
      >
        <vts-tree-node-option>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasNoContent">
        <input
          vts-input
          placeholder="Input node name"
          vtsSize="sm"
          #inputElement
          class="input"
          (keydown.enter)="saveNode(node, inputElement.value)"
        />
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle vtsCaret></vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.name }}
          &nbsp;
          <a href="javascript:void(0)">
            <i vts-icon vtsType="AddOutline:vts" (click)="addNewNode(node)"></i>
          </a>
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `,
  styles: [
    `
      .input {
        margin: auto 0;
      }
    `
  ]
})
export class VtsDemoTreeViewEditableComponent {
  private transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.key === node.key
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
            key: node.key
          };
    flatNode.name = node.name;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeData = TREE_DATA;
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
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
    this.dataSource.setData(this.treeData);
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
  hasNoContent = (_: number, node: FlatNode) => node.name === '';
  trackBy = (_: number, node: FlatNode) => `${node.key}-${node.name}`;

  addNewNode(node: FlatNode): void {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push({
        name: '',
        key: `${parentNode.key}-${parentNode.children.length}`
      });
      this.dataSource.setData(this.treeData);
      this.treeControl.expand(node);
    }
  }

  saveNode(node: FlatNode, value: string): void {
    const nestedNode = this.flatNodeMap.get(node);
    if (nestedNode) {
      nestedNode.name = value;
      this.dataSource.setData(this.treeData);
    }
  }
}
