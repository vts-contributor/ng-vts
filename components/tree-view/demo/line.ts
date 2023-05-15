import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Tree view item',
    children: [
      {
        name: 'Tree view item',
        children: [
          {
            name: 'Tree view item',
            children: [
              {
                name: 'Tree view item'
              },
              {
                name: 'Tree view item'
              }
            ]
          },
          {
            name: 'Tree view item'
          }
        ]
      },
      {
        name: 'Tree view item',
        children: [
          {
            name: 'Tree view item'
          }
        ]
      }
    ]
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
    Show Line:
    <vts-switch [(ngModel)]="showLine"></vts-switch>

    <vts-tree-view
      [vtsTreeControl]="treeControl"
      [vtsDataSource]="dataSource"
      [vtsShowLine]="showLine"
    >
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-option>
          <span vts-icon vtsType="Boxes:bootstrap"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle>
          <i
            vts-icon
            [vtsType]="
              treeControl.isExpanded(node) ? 'MinusSquareOutline:antd' : 'PlusSquareOutline:antd'
            "
          ></i>
        </vts-tree-node-toggle>
        <vts-tree-node-option>
          <span vts-icon vtsType="Boxes:bootstrap"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewLineComponent implements AfterViewInit {
  showLine = true;

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
