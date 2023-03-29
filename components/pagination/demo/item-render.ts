import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pagination-item-render',
  template: `
    <vts-pagination
      [vtsPageIndex]="1"
      [vtsTotal]="500"
      [vtsItemRender]="renderItemTemplate"
      #p="vtsPagination"
    ></vts-pagination>
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <a class="link" [attr.disabled]="p.index === 1 ? true : null" *ngSwitchCase="'begin'">
          Begin
        </a>
        <a class="link" [attr.disabled]="p.index === 1 ? true : null" *ngSwitchCase="'prev'">
          Previous
        </a>
        <a
          class="link"
          [attr.disabled]="p.index === p.lastIndex ? true : null"
          *ngSwitchCase="'next'"
        >
          Next
        </a>
        <a
          class="link"
          [attr.disabled]="p.index === p.lastIndex ? true : null"
          *ngSwitchCase="'last'"
        >
          Last
        </a>
      </ng-container>
    </ng-template>
  `,
  styles: [``]
})
export class VtsDemoPaginationItemRenderComponent {}
