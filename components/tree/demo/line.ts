import { Component } from '@angular/core';
import { VtsFormatEmitEvent } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-line',
  template: `
    <vts-tree [vtsData]="nodes" vtsShowLine (vtsClick)="vtsEvent($event)"></vts-tree>
  `
})
export class VtsDemoTreeLineComponent {
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          expanded: true,
          children: [
            { title: 'leaf', key: '10010', isLeaf: true },
            { title: 'leaf', key: '10011', isLeaf: true },
            { title: 'leaf', key: '10012', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf', key: '10020', isLeaf: true }]
        },
        {
          title: 'parent 1-2',
          key: '1003',
          children: [
            { title: 'leaf', key: '10030', isLeaf: true },
            { title: 'leaf', key: '10031', isLeaf: true }
          ]
        }
      ]
    }
  ];

  vtsEvent(event: VtsFormatEmitEvent): void {
    console.log(event);
  }
}
