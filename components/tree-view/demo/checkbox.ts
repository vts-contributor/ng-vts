import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  icon: string;
  disabled?: boolean;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Tree view item',
    icon: 'FolderOpenDoutone:antd',
    children: [
      {
        name: 'Tree view item',
        icon: 'FolderOpenDoutone:antd',
        disabled: false,
        children: [
          {
            name: 'Tree view item',
            icon: 'FolderOpenDoutone:antd',
            children: [
              {
                name: 'Tree view item',
                icon: 'FileText:antd'
              },
              {
                name: 'Tree view item',
                icon: 'FileText:antd'
              }
            ]
          },
          {
            name: 'Tree view item',
            icon: 'FileText:antd'
          }
        ]
      },
      {
        name: 'Tree view item',
        icon: 'FolderOpenDoutone:antd',
        disabled: true,
        children: [
          {
            name: 'Tree view item',
            icon: 'FileText:antd'
          }
        ]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  icon: string;
  level: number;
  disabled: boolean;
}

@Component({
  selector: 'vts-demo-tree-view-checkbox',
  template: `
    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource">
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-toggle vtsNoop></vts-tree-node-toggle>
        <vts-tree-node-checkbox
          [vtsChecked]="checklistSelection.isSelected(node)"
          (vtsClick)="leafItemSelectionToggle(node)"
        ></vts-tree-node-checkbox>
        <vts-tree-node-option>
          <span vts-icon [vtsType]="node.icon"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle vtsCaret vtsRecursive></vts-tree-node-toggle>
        <vts-tree-node-checkbox
          [vtsChecked]="descendantsAllSelected(node)"
          [vtsIndeterminate]="descendantsPartiallySelected(node)"
          (vtsClick)="itemSelectionToggle(node)"
        ></vts-tree-node-checkbox>
        <vts-tree-node-option>
          <span vts-icon [vtsType]="node.icon"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewCheckboxComponent implements AfterViewInit {
  private transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            icon: node.icon,
            level: level,
            disabled: !!node.disabled
          };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  checklistSelection = new SelectionModel<FlatNode>(true);

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
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }

  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return (
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      })
    );
  }

  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  leafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  itemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = node.level;

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
