import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-basic',
  template: `
    <vts-slider [vtsMin]="0" [vtsMax]="500" [(ngModel)]="value1"></vts-slider>
  `,
  styles: [
    `
      :host {
        margin-top: 40px;
        display: block;
      }
    `
  ]
})
export class VtsDemoSliderBasicComponent {
  disabled = false;
  value1 = 30;
}
