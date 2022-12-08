import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-mini',
  template: `
    <vts-pagination [(vtsPageIndex)]="current" [vtsTotal]="50" [vtsSize]="'sm'"></vts-pagination>
    <br />
    <vts-pagination
      [(vtsPageIndex)]="current"
      [vtsTotal]="50"
      [vtsSize]="'sm'"
      vtsShowSizeChanger
      vtsShowQuickJumper
    ></vts-pagination>
    <br />
    <vts-pagination
      [(vtsPageIndex)]="current"
      [vtsTotal]="50"
      [vtsSize]="'sm'"
      [vtsShowTotal]="totalTemplate"
    ></vts-pagination>
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
  `
})
export class VtsDemoPaginationMiniComponent {
  current = 1;
}
