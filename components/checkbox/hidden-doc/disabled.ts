import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-disabled',
  template: `
    <label vts-checkbox vtsDisabled [ngModel]="false"></label>
    <br />
    <label vts-checkbox vtsDisabled [ngModel]="true"></label>
  `
})
export class VtsDemoCheckboxDisabledComponent {}
