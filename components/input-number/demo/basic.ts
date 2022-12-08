import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-basic',
  template: `
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="1"
    ></vts-input-number>
  `
})
export class VtsDemoInputNumberBasicComponent {
  demoValue = 3;
}
