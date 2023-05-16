import { Component } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-select-async',
  template: `
    <vts-tree-select
      style="width: 100%"
      vtsPlaceHolder="Please select"
      [vtsExpandedKeys]="expandKeys"
      [(ngModel)]="value"
      [vtsDropdownMatchSelectWidth]="true"
      [vtsDropdownStyle]="{ 'max-height': '300px' }"
      [vtsNodes]="nodes"
      [vtsAsyncData]="true"
      (vtsExpandChange)="onExpandChange($event)"
    ></vts-tree-select>
  `
})
export class VtsDemoTreeSelectAsyncComponent {
  expandKeys = ['0-0'];
  value?: string;
  nodes = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1'
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2'
        }
      ]
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1'
    }
  ];

  onExpandChange(e: VtsFormatEmitEvent): void {
    const node = e.node;
    if (node && node.getChildren().length === 0 && node.isExpanded) {
      this.loadNode().then(data => {
        node.addChildren(data);
      });
    }
  }

  loadNode(): Promise<VtsTreeNodeOptions[]> {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve([
            { title: 'Child Node', key: `${new Date().getTime()}-0` },
            { title: 'Child Node', key: `${new Date().getTime()}-1` }
          ]),
        1000
      );
    });
  }
}
