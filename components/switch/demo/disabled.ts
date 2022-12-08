import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-disabled',
  template: `
    <vts-switch [(ngModel)]="switchValue" [vtsDisabled]="isDisabled"></vts-switch>
    <br />
    <br />
    <button vts-button [vtsType]="'primary'" (click)="isDisabled = !isDisabled">
      Toggle disabled
    </button>
  `
})
export class VtsDemoSwitchDisabledComponent {
  switchValue = false;
  isDisabled = true;
}
