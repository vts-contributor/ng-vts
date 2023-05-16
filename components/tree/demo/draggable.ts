import { Component } from '@angular/core';
import { VtsFormatEmitEvent } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-draggable',
  template: `
    <vts-tree
      [vtsData]="nodes"
      vtsShowIcon
      vtsExpandAll
      vtsDraggable
      (vtsOnDrop)="onEvent($event)"
    ></vts-tree>
  `
})
export class VtsDemoTreeDraggableComponent {
  nodes = [
    {
      title: 'Tree view item 1',
      key: '1',
      icon: 'FolderOpenDoutone:antd',
      children: [
        {
          title: 'Tree view item 1',
          key: '1-1',
          icon: 'FolderOpenDoutone:antd',
          children: [
            {
              title: 'Tree view item 2',
              key: '1-1-1',
              icon: 'FolderOpenDoutone:antd',
              children: [
                {
                  title: 'Tree view item 3',
                  key: '1-1-1-1',
                  icon: 'FileText:antd',
                  isLeaf: true
                },
                {
                  title: 'Tree view item 4',
                  key: '1-1-1-2',
                  icon: 'FileText:antd',
                  isLeaf: true
                }
              ]
            },
            {
              title: 'Tree view item 5',
              key: '1-1-2',
              icon: 'FileText:antd',
              isLeaf: true
            }
          ]
        },
        {
          title: 'Tree view item 6',
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
  }
}
