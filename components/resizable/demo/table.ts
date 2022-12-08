import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-table',
  template: `
    <vts-table #basicTable [vtsData]="listOfData">
      <thead>
        <tr>
          <ng-container *ngFor="let col of cols">
            <th
              *ngIf="col.width"
              vts-resizable
              vtsBounds="window"
              vtsPreview
              [vtsWidth]="col.width"
              [vtsMaxWidth]="256"
              [vtsMinWidth]="60"
              (vtsResizeEnd)="onResize($event, col.title)"
            >
              {{ col.title }}
              <vts-resize-handle vtsDirection="right">
                <div class="resize-trigger"></div>
              </vts-resize-handle>
            </th>
            <th *ngIf="!col.width">
              {{ col.title }}
            </th>
          </ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>-</td>
        </tr>
      </tbody>
    </vts-table>
  `,
  styles: [
    `
      .resize-trigger {
        width: 1px;
        height: 30px;
        margin-top: 12px;
        background: #e8e8e8;
      }
      .vts-resizable-preview {
        border-width: 0;
        border-right-width: 1px;
      }
    `
  ]
})
export class VtsDemoResizableTableComponent {
  cols = [
    {
      title: 'Name',
      width: '180px'
    },
    {
      title: 'Age',
      width: '180px'
    },
    {
      title: 'Address',
      width: '200px'
    },
    {
      title: 'Actions'
    }
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  onResize({ width }: VtsResizeEvent, col: string): void {
    this.cols = this.cols.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
  }
}
