import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-total',
  template: `
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      [vtsShowTotal]="totalTemplate"
    ></vts-pagination>
    <br />
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      [vtsShowTotal]="rangeTemplate"
    ></vts-pagination>
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>
  `
})
export class VtsDemoPaginationTotalComponent {}
