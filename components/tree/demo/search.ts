import { Component } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

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
      vtsExpandAll
      [vtsSearchValue]="searchValue"
      (vtsClick)="onEvent($event)"
      (vtsExpandChange)="onEvent($event)"
      (vtsSearchValueChange)="onEvent($event)"
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

  nodes: VtsTreeNodeOptions[] = [
    {
      title: 'Folder 1',
      key: '1',
      children: [
        {
          title: 'Folder 1-1',
          key: '1-1',
          children: [
            {
              title: 'Folder 1-1-1',
              key: '1-1-1',
              children: [
                { title: 'File 1', key: '1-1-1-1', isLeaf: true },
                { title: 'File 2', key: '1-1-1-2', isLeaf: true }
              ]
            },
            { title: 'File 3', key: '1-1-2', isLeaf: true }
          ]
        },
        {
          title: 'Folder 1-2',
          key: '1-2',
          children: [{ title: 'File 4', key: '1-2-1', isLeaf: true }]
        }
      ]
    }
  ];

  onEvent(event: VtsFormatEmitEvent): void {
    console.log(event);
  }
}
