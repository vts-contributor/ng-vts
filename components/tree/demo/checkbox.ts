import { Component, ViewChild } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeComponent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-checkbox',
  template: `
    <vts-tree
      #vtsTreeComponent
      [vtsData]="nodes"
      vtsShowIcon
      vtsExpandAll
      vtsCheckable
      (vtsClick)="onEvent($event)"
      (vtsContextMenu)="onEvent($event)"
      (vtsExpandChange)="onEvent($event)"
    ></vts-tree>
  `
})
export class VtsDemoTreeCheckboxComponent {
  @ViewChild('vtsTreeComponent', { static: false }) vtsTreeComponent!: VtsTreeComponent;

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
