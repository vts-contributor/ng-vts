import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';

interface TreeNode {
  name: string;
  icon: string;
  disabled?: boolean;
  disabledToggle?: boolean;
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
        disabledToggle: true,
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
  disabledToggle: boolean;
}

@Component({
  selector: 'vts-demo-tree-view-basic',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource" [vtsSize]="size">
      <vts-tree-node
        *vtsTreeNodeDef="let node"
        (vtsClick)="selectListSelection.toggle(node)"
        [vtsDisabled]="node.disabled"
        [vtsSelected]="selectListSelection.isSelected(node)"
      >
        <vts-tree-node-toggle vtsNoop></vts-tree-node-toggle>
        <vts-tree-node-option>
          <span vts-icon [vtsType]="node.icon"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
      <vts-tree-node
        *vtsTreeNodeDef="let node; when: hasChild"
        (vtsClick)="selectListSelection.toggle(node)"
        [vtsDisabled]="node.disabled"
        [vtsSelected]="selectListSelection.isSelected(node)"
      >
        <vts-tree-node-toggle
          vtsCaret
          vtsRecursive
          [vtsDisabled]="node.disabledToggle"
        ></vts-tree-node-toggle>
        <vts-tree-node-option>
          <span vts-icon [vtsType]="node.icon"></span>
          {{ node.name }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewBasicComponent {
  size: VtsSizeLMSType = 'md';
  private transformer: (node: TreeNode, level: number) => FlatNode = (node, level) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      level: level,
      disabled: !!node.disabled,
      disabledToggle: !!node.disabledToggle
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
