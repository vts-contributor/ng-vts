import { Component } from '@angular/core';
import { VtsFormatEmitEvent } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-search',
  template: `
    <vts-input-group [vtsSuffix]="suffixIcon">
      <input type="text" vts-input placeholder="Search" [(ngModel)]="searchValue" />
    </vts-input-group>
    <ng-template #suffixIcon>
      <i vts-icon vtsType="Search"></i>
    </ng-template>
    <vts-tree
      [vtsData]="nodes"
      [vtsSearchValue]="searchValue"
      (vtsClick)="vtsEvent($event)"
      (vtsExpandChange)="vtsEvent($event)"
      (vtsSearchValueChange)="vtsEvent($event)"
    ></vts-tree>
  `,
  styles: [
    `
      vts-input-group {
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoTreeSearchComponent {
  searchValue = '';

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  vtsEvent(event: VtsFormatEmitEvent): void {
    console.log(event);
  }
}
