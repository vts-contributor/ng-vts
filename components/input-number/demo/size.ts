import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-size',
  template: `
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsSize]="'lg'"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="1"
    ></vts-input-number>
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="1"
    ></vts-input-number>
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsSize]="'sm'"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="1"
    ></vts-input-number>
  `,
  styles: [
    `
      vts-input-number {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoInputNumberSizeComponent {
  demoValue = 3;
}
