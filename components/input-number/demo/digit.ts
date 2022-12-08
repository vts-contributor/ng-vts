import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-digit',
  template: `
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="0.1"
      [vtsPlaceHolder]="'Digital'"
    ></vts-input-number>
  `
})
export class VtsDemoInputNumberDigitComponent {
  demoValue: number = 0;
}
