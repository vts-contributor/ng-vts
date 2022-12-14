import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-item-render',
  template: `
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="500"
      [vtsItemRender]="renderItemTemplate"
    ></vts-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <a *ngSwitchCase="'prev'">Previous</a>
        <a *ngSwitchCase="'next'">Next</a>
        <a *ngSwitchCase="'prev_5'"><<</a>
        <a *ngSwitchCase="'next_5'">>></a>
      </ng-container>
    </ng-template>
  `
})
export class VtsDemoPaginationItemRenderComponent {}
