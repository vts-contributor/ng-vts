import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-item-render',
  template: `
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="500"
      [vtsItemRender]="renderItemTemplate"
      #p="vtsPagination"
      vtsShowSizeChanger
    ></vts-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <a *ngSwitchCase="'next_5'">5️⃣</a>
        <a *ngSwitchCase="'prev_5'">5️⃣</a>
        <a [class.link-disabled]="p.index === 1" *ngSwitchCase="'begin'">Begin</a>
        <a [class.link-disabled]="p.index === 1" *ngSwitchCase="'prev'">Previous</a>
        <a [class.link-disabled]="p.index === 1" *ngSwitchCase="'next'">Next</a>
        <a [class.link-disabled]="p.index === 1" *ngSwitchCase="'last'">Last</a>
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
    `
  ]
})
export class VtsDemoPaginationItemRenderComponent {}
