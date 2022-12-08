import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-basic',
  template: `
    <vts-switch [(ngModel)]="switchValue"></vts-switch>
  `
})
export class VtsDemoSwitchBasicComponent {
  switchValue = false;
}
