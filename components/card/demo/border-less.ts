import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-border-less',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <vts-card
        style="width:300px;"
        [vtsBordered]="false"
        vtsTitle="Card title"
        [vtsExtra]="extraTemplate"
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </vts-card>
    </div>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class VtsDemoCardBorderLessComponent {}
