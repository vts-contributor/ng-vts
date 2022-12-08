import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-basic',
  template: `
    <vts-card style="width:300px;" vtsTitle="Card title" [vtsExtra]="extraTemplate">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </vts-card>
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
export class VtsDemoCardBasicComponent {}
