import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-loading',
  template: `
    <vts-switch [ngModel]="true" vtsLoading></vts-switch>
    <br />
    <br />
    <vts-switch vtsSize="sm" [ngModel]="false" vtsLoading></vts-switch>
  `
})
export class VtsDemoSwitchLoadingComponent {}
