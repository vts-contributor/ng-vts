import { Component } from '@angular/core';
import { VtsFormatBeforeDropEvent } from '@ui-vts/ng-vts/tree';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-tree-draggable-confirm',
  template: `
    <vts-tree [vtsData]="nodes" vtsDraggable vtsBlockNode [vtsBeforeDrop]="beforeDrop"></vts-tree>
  `
})
export class VtsDemoTreeDraggableConfirmComponent {
  nodes = [
    {
      title: '0-0',
      key: '100',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '1001',
          children: [
            { title: '0-0-0-0', key: '10010', isLeaf: true },
            { title: '0-0-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '1002',
          children: [{ title: '0-0-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  beforeDrop(arg: VtsFormatBeforeDropEvent): Observable<boolean> {
    // if insert node into another node, wait 1s
    if (arg.pos === 0) {
      return of(true).pipe(delay(1000));
    } else {
      return of(false);
    }
  }
}
