import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'parent 1',
    children: [
      {
        name: 'parent 1-0',
        children: [{ name: 'leaf' }, { name: 'leaf' }]
      },
      {
        name: 'parent 1-1',
        children: [
          { name: 'leaf' },
          {
            name: 'parent 1-1-0',
            children: [{ name: 'leaf' }, { name: 'leaf' }]
          },
          { name: 'leaf' }
        ]
      }
    ]
  },
  {
    name: 'parent 2',
    children: [{ name: 'leaf' }, { name: 'leaf' }]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'vts-demo-tree-view-line',
  template: `
    Show Leaf Icon:
    <vts-switch [(ngModel)]="showLeafIcon"></vts-switch>

    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource">
      <vts-tree-node *vtsTreeNodeDef="let node" vtsTreeNodeIndentLine>
        <vts-tree-node-toggle vtsTreeNodeNoopToggle *ngIf="showLeafIcon">
          <i vts-icon vtsType="DescriptionOutline"></i>
        </vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild" vtsTreeNodeIndentLine>
        <vts-tree-node-toggle>
          <i vts-icon [vtsType]="treeControl.isExpanded(node) ? 'minus-square' : 'plus-square'"></i>
        </vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewLineComponent implements AfterViewInit {
  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

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

  showLeafIcon = false;
  constructor() {
    this.dataSource.setData(TREE_DATA);
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngAfterViewInit(): void {
    this.treeControl.expandAll();
  }

  getNode(name: string): FlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
