import { Component } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-line',
  template: `
    Show Line:
    <vts-switch [(ngModel)]="showLine"></vts-switch>

    <vts-tree
      [vtsData]="nodes"
      [vtsShowLine]="showLine"
      [vtsExpandedIcon]="customIcon"
      (vtsClick)="onEvent($event)"
    ></vts-tree>

    <ng-template #customIcon let-node>
      <i
        vts-icon
        [vtsType]="node.isExpanded ? 'MinusSquareOutline:antd' : 'PlusSquareOutline:antd'"
      ></i>
    </ng-template>
  `
})
export class VtsDemoTreeLineComponent {
  showLine = true;
  nodes: VtsTreeNodeOptions[] = [
    {
      title: 'Tree view item',
      key: '1',
      icon: 'Boxes:bootstrap',
      expanded: true,
      children: [
        {
          title: 'Tree view item',
          key: '1-1',
          icon: 'Boxes:bootstrap',
          expanded: true,
          children: [
            {
              title: 'Tree view item',
              key: '1-1-1',
              icon: 'Boxes:bootstrap',
              expanded: true,
              children: [
                {
                  title: 'Tree view item',
                  key: '1-1-1-1',
                  icon: 'Boxes:bootstrap',
                  isLeaf: true
                },
                {
                  title: 'Tree view item',
                  key: '1-1-1-2',
                  icon: 'Boxes:bootstrap',
                  isLeaf: true
                }
              ]
            },
            {
              title: 'Tree view item',
              key: '1-1-2',
              icon: 'Boxes:bootstrap',
              isLeaf: true
            }
          ]
        },
        {
          title: 'Tree view item',
          key: '1-2',
          icon: 'Boxes:bootstrap',
          expanded: true,
          children: [
            {
              title: 'Tree view item',
              key: '1-2-1',
              icon: 'Boxes:bootstrap',
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
