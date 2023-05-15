import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

function dig(path: string = '0', level: number = 3): FoodNode[] {
  const list: FoodNode[] = [];
  for (let i = 0; i < 10; i += 1) {
    const name = `${path}-${i}`;
    const treeNode: FoodNode = {
      name
    };

    if (level > 0) {
      treeNode.children = dig(name, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const TREE_DATA: FoodNode[] = dig();

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'vts-demo-tree-view-virtual-scroll',
  template: `
    <vts-tree-virtual-scroll-view
      class="virtual-scroll-tree"
      [vtsTreeControl]="treeControl"
      [vtsDataSource]="dataSource"
      vtsShowLine
    >
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-option>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle vtsCaret></vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-virtual-scroll-view>
  `,
  styles: [
    `
      .virtual-scroll-tree {
        height: 200px;
      }
    `
  ]
})
export class VtsDemoTreeViewVirtualScrollComponent implements AfterViewInit {
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngAfterViewInit(): void {}

  getNode(name: string): ExampleFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
