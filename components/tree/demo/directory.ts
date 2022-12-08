import { Component } from '@angular/core';
import { VtsContextMenuService, VtsDropdownMenuComponent } from '@ui-vts/ng-vts/dropdown';
import { VtsFormatEmitEvent, VtsTreeNode } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-directory',
  template: `
    <vts-tree
      vtsBlockNode
      [vtsData]="nodes"
      (vtsClick)="activeNode($event)"
      (vtsDblClick)="openFolder($event)"
      [vtsTreeTemplate]="vtsTreeTemplate"
    ></vts-tree>
    <ng-template #vtsTreeTemplate let-node let-origin="origin">
      <span class="custom-node">
        <span *ngIf="!node.isLeaf" (contextmenu)="contextMenu($event, menu)">
          <i
            vts-icon
            [vtsType]="node.isExpanded ? 'folder-open' : 'folder'"
            (click)="openFolder(node)"
          ></i>
          <span class="folder-name">{{ node.title }}</span>
          <span class="folder-desc">created by {{ origin.author | lowercase }}</span>
        </span>
        <span *ngIf="node.isLeaf" (contextmenu)="contextMenu($event, menu)">
          <i vts-icon vtsType="DescriptionOutline"></i>
          <span class="file-name">{{ node.title }}</span>
          <span class="file-desc">modified by {{ origin.author | lowercase }}</span>
        </span>
      </span>
    </ng-template>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item (click)="selectDropdown()">Action 1</li>
        <li vts-menu-item (click)="selectDropdown()">Action 2</li>
      </ul>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      vts-tree {
        overflow: hidden;
        margin: 0 -24px;
        padding: 0 24px;
      }

      .custom-node {
        cursor: pointer;
        line-height: 24px;
        margin-left: 4px;
        display: inline-block;
      }

      .file-name,
      .folder-name {
        margin-left: 4px;
      }

      .file-desc,
      .folder-desc {
        padding: 0 8px;
        display: inline-block;
        background: #87ceff;
        color: #ffffff;
        position: relative;
        left: 12px;
      }
    `
  ]
})
export class VtsDemoTreeDirectoryComponent {
  // activated node
  activatedNode?: VtsTreeNode;
  nodes = [
    {
      title: 'parent 0',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  openFolder(data: VtsTreeNode | VtsFormatEmitEvent): void {
    // do something if u want
    if (data instanceof VtsTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: VtsFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: VtsDropdownMenuComponent): void {
    this.vtsContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  constructor(private vtsContextMenuService: VtsContextMenuService) {}
}
