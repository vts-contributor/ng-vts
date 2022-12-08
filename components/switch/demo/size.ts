import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-size',
  template: `
    <vts-switch [ngModel]="true"></vts-switch>
    <br />
    <br />
    <vts-switch vtsSize="sm" [ngModel]="true"></vts-switch>
  `
})
export class VtsDemoSwitchSizeComponent {}
