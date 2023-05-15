import { Component, ViewChild } from '@angular/core';
import { VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';
import { VtsFormatEmitEvent, VtsTreeComponent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-basic',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-tree
      #vtsTreeComponent
      [vtsData]="nodes"
      [vtsSize]="size"
      vtsShowIcon
      vtsExpandAll
      vtsSelectable
      [vtsSelectedKeys]="defaultSelectedKeys"
      (vtsClick)="onEvent($event)"
      (vtsContextMenu)="onEvent($event)"
      (vtsExpandChange)="onEvent($event)"
    ></vts-tree>
  `
})
export class VtsDemoTreeBasicComponent {
  size: VtsSizeLMSType = 'md';

  @ViewChild('vtsTreeComponent', { static: false }) vtsTreeComponent!: VtsTreeComponent;
  defaultSelectedKeys = ['1-2-1'];

  nodes: VtsTreeNodeOptions[] = [
    {
      title: 'Tree view item',
      key: '1',
      icon: 'FolderOpenDoutone:antd',
      children: [
        {
          title: 'Tree view item',
          key: '1-1',
          icon: 'FolderOpenDoutone:antd',
          children: [
            {
              title: 'Tree view item',
              key: '1-1-1',
              icon: 'FolderOpenDoutone:antd',
              children: [
                {
                  title: 'Tree view item',
                  key: '1-1-1-1',
                  icon: 'FileText:antd',
                  isLeaf: true
                },
                {
                  title: 'Tree view item',
                  key: '1-1-1-2',
                  icon: 'FileText:antd',
                  isLeaf: true
                }
              ]
            },
            {
              title: 'Tree view item',
              key: '1-1-2',
              icon: 'FileText:antd',
              isLeaf: true
            }
          ]
        },
        {
          title: 'Tree view item',
          key: '1-2',
          icon: 'FolderOpenDoutone:antd',
          disabled: true,
          children: [
            {
              title: 'Tree view item',
              key: '1-2-1',
              icon: 'FileText:antd',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  onEvent(event: VtsFormatEmitEvent): void {
    console.log(event);
    console.log('selected', this.vtsTreeComponent.getSelectedNodeList());
    console.log('expanded', this.vtsTreeComponent.getExpandedNodeList());
  }
}
