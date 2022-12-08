import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeComponent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-basic',
  template: `
    <vts-tree
      #vtsTreeComponent
      [vtsData]="nodes"
      vtsCheckable
      [vtsCheckedKeys]="defaultCheckedKeys"
      [vtsExpandedKeys]="defaultExpandedKeys"
      [vtsSelectedKeys]="defaultSelectedKeys"
      (vtsClick)="vtsClick($event)"
      (vtsContextMenu)="vtsClick($event)"
      (vtsCheckBoxChange)="vtsCheck($event)"
      (vtsExpandChange)="vtsCheck($event)"
    ></vts-tree>
  `
})
export class VtsDemoTreeBasicComponent implements AfterViewInit {
  @ViewChild('vtsTreeComponent', { static: false })
  vtsTreeComponent!: VtsTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  nodes: VtsTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            {
              title: 'leaf 1-0-0',
              key: '10010',
              disableCheckbox: true,
              isLeaf: true
            },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
            { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
          ]
        }
      ]
    }
  ];

  vtsClick(event: VtsFormatEmitEvent): void {
    console.log(event);
  }

  vtsCheck(event: VtsFormatEmitEvent): void {
    console.log(event);
  }

  // vtsSelectedKeys change
  vtsSelect(keys: string[]): void {
    console.log(keys, this.vtsTreeComponent.getSelectedNodeList());
  }

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.vtsTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.vtsTreeComponent.getTreeNodes(),
      this.vtsTreeComponent.getCheckedNodeList(),
      this.vtsTreeComponent.getSelectedNodeList(),
      this.vtsTreeComponent.getExpandedNodeList()
    );
  }
}
