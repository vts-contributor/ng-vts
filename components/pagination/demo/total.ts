import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-total',
  template: `
    <p>Total:</p>
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      [vtsShowTotal]="totalTemplate"
    ></vts-pagination>
    <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>

    <br />
    <p>Range:</p>
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      [vtsShowTotal]="rangeTemplate"
    ></vts-pagination>
    <ng-template #rangeTemplate let-range="range" let-total>
      {{ range[0] }}-{{ range[1] }} of {{ total }} items
    </ng-template>

    <br />
    <p>Using export to create custom template:</p>
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="85"
      [vtsPageSize]="20"
      #c="vtsPagination"
    ></vts-pagination>
    <div style="margin-top: 8px; font-size: 14px">
      Total {{ c.total }} (Page {{ c.index }}/{{ c.lastIndex }}) (Showing {{ c.range[0] }}-{{
        c.range[1]
      }}
      of {{ c.total }} items)
    </div>
  `
})
export class VtsDemoPaginationTotalComponent {}
