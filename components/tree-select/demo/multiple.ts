import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tree-select-multiple',
  template: `
    <vts-tree-select
      style="width: 250px"
      vtsPlaceHolder="Please select"
      [(ngModel)]="value"
      [vtsMaxTagCount]="3"
      [vtsMaxTagPlaceholder]="omittedPlaceHolder"
      [vtsNodes]="nodes"
      [vtsDefaultExpandAll]="true"
      [vtsAllowClear]="false"
      [vtsMultiple]="true"
      (ngModelChange)="onChange($event)"
    ></vts-tree-select>
    <ng-template #omittedPlaceHolder let-omittedValues>
      and {{ omittedValues.length }} more...
    </ng-template>
  `
})
export class VtsDemoTreeSelectMultipleComponent {
  value: string[] = [];
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  onChange($event: string[]): void {
    console.log($event);
  }
}
