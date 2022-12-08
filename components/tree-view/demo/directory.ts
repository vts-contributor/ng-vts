import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface FoodNode {
  name: string;
  disabled?: boolean;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana', disabled: true }, { name: 'Fruit loops' }]
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

@Component({
  selector: 'vts-demo-tree-view-directory',
  template: `
    <vts-tree-view
      [vtsTreeControl]="treeControl"
      [vtsDataSource]="dataSource"
      [vtsDirectoryTree]="true"
    >
      <vts-tree-node *vtsTreeNodeDef="let node" vtsTreeNodePadding>
        <vts-tree-node-toggle vtsTreeNodeNoopToggle></vts-tree-node-toggle>
        <vts-tree-node-option
          [vtsDisabled]="node.disabled"
          [vtsSelected]="selectListSelection.isSelected(node)"
          (vtsClick)="selectListSelection.toggle(node)"
        >
          <i vts-icon vtsType="DescriptionOutline"></i>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild" vtsTreeNodePadding>
        <vts-tree-node-toggle>
          <i vts-icon vtsType="ArrowMiniDown" vtsTreeNodeToggleRotateIcon></i>
        </vts-tree-node-toggle>
        <vts-tree-node-option
          [vtsDisabled]="node.disabled"
          [vtsSelected]="selectListSelection.isSelected(node)"
          (vtsClick)="selectListSelection.toggle(node)"
        >
          <i vts-icon [vtsType]="treeControl.isExpanded(node) ? 'folder-open' : 'folder'"></i>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewDirectoryComponent implements AfterViewInit {
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      disabled: !!node.disabled
    };
  };
  selectListSelection = new SelectionModel<ExampleFlatNode>();

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
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.treeControl.expand(this.getNode('Vegetables')!);
    }, 300);
  }

  getNode(name: string): ExampleFlatNode | null {
    return this.treeControl.dataNodes.find(n => n.name === name) || null;
  }
}
