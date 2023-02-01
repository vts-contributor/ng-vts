import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-inner',
  template: `
    <vts-card vtsTitle="Card Title">
      <p style="font-size:14px;color:rgba(0, 0, 0, 0.85);margin-bottom:16px;font-weight: 500;">
        Group title
      </p>
      <vts-card vtsType="inner" vtsTitle="Inner Card Title" [vtsExtra]="extraTemplate">
        <a>Inner Card Content</a>
      </vts-card>
      <vts-card
        vtsType="inner"
        style="margin-top:16px;"
        vtsTitle="Inner Card Title"
        [vtsExtra]="extraTemplate"
      >
        <a>Inner Card Content</a>
      </vts-card>
    </vts-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `
})
export class VtsDemoCardInnerComponent {}
