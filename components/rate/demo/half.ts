import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-rate-half',
  template: `
    <vts-rate [ngModel]="2.5" vtsAllowHalf></vts-rate>
  `
})
export class VtsDemoRateHalfComponent {}
