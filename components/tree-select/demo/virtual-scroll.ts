import { Component, OnInit } from '@angular/core';
import { VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-select-virtual-scroll',
  template: `
    <vts-tree-select
      style="width: 250px"
      [vtsNodes]="nodes"
      vtsShowSearch
      vtsPlaceHolder="Please select"
      vtsVirtualHeight="300px"
    ></vts-tree-select>
  `
})
export class VtsDemoTreeSelectVirtualScrollComponent implements OnInit {
  nodes: VtsTreeNodeOptions[] = [];

  ngOnInit(): void {
    const dig = (path = '0', level = 3) => {
      const list = [];
      for (let i = 0; i < 10; i += 1) {
        const key = `${path}-${i}`;
        const treeNode: VtsTreeNodeOptions = {
          title: key,
          key,
          expanded: true,
          children: [],
          isLeaf: false
        };

        if (level > 0) {
          treeNode.children = dig(key, level - 1);
        } else {
          treeNode.isLeaf = true;
        }

        list.push(treeNode);
      }
      return list;
    };

    this.nodes = dig();
  }
}
