import { Component } from '@angular/core';
import { VtsFormatEmitEvent, VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-dynamic',
  template: `
    <vts-tree
      [vtsData]="nodes"
      vtsAsyncData
      (vtsClick)="vtsEvent($event)"
      (vtsExpandChange)="vtsEvent($event)"
    ></vts-tree>
  `
})
export class VtsDemoTreeDynamicComponent {
  nodes = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true }
  ];

  vtsEvent(event: VtsFormatEmitEvent): void {
    console.log(event);
    // load child async
    if (event.eventName === 'expand') {
      const node = event.node;
      if (node?.getChildren().length === 0 && node?.isExpanded) {
        this.loadNode().then(data => {
          node.addChildren(data);
        });
      }
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
