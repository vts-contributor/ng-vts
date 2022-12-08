import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tree-select-customized-icon',
  template: `
    <vts-tree-select
      style="width: 250px"
      [(ngModel)]="value"
      [vtsNodes]="nodes"
      vtsPlaceHolder="Please select"
      vtsShowIcon
    ></vts-tree-select>
    <br />
    <vts-tree-select
      style="width: 250px; margin-top: 20px;"
      [(ngModel)]="value"
      [vtsNodes]="nodes"
      vtsPlaceHolder="Please select"
    >
      <ng-template #vtsTreeTemplate let-node>
        <span
          class="vts-tree-node-content-wrapper"
          [class.vts-tree-node-selected]="node.isSelected"
        >
          <span>
            <i vts-icon [vtsType]="node.isExpanded ? 'folder-open' : 'folder'"></i>
            {{ node.title }}
          </span>
        </span>
      </ng-template>
    </vts-tree-select>
  `
})
export class VtsDemoTreeSelectCustomizedIconComponent {
  value?: string;
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      expanded: true,
      icon: 'smile',
      children: [
        { title: 'leaf 1-0-0', key: '10010', icon: 'meh', isLeaf: true },
        { title: 'leaf 1-0-1', key: '10011', icon: 'frown', isLeaf: true }
      ]
    }
  ];
}
