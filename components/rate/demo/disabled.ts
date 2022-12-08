import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-rate-disabled',
  template: `
    <vts-rate [ngModel]="2" vtsDisabled></vts-rate>
  `
})
export class VtsDemoRateDisabledComponent {}
