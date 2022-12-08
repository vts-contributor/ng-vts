import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tree-customized-icon',
  template: `
    <vts-tree [vtsData]="nodes" vtsShowIcon></vts-tree>
    <vts-tree [vtsData]="nodes" vtsShowIcon [vtsExpandedIcon]="multiExpandedIconTpl">
      <ng-template #multiExpandedIconTpl let-node let-origin="origin">
        <i
          *ngIf="!origin.isLeaf"
          vts-icon
          [vtsType]="node.isExpanded ? 'folder-open' : 'folder'"
          class="vts-tree-switcher-line-icon"
        ></i>
        <i
          *ngIf="origin.isLeaf"
          vts-icon
          vtsType="DescriptionOutline"
          class="vts-tree-switcher-line-icon"
        ></i>
      </ng-template>
    </vts-tree>
  `
})
export class VtsDemoTreeCustomizedIconComponent {
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf', key: '1001', icon: 'meh', isLeaf: true },
        { title: 'leaf', key: '1002', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}
