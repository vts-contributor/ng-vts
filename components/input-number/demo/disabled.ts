import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-disabled',
  template: `
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="10"
      [vtsStep]="1"
      [vtsDisabled]="isDisabled"
    ></vts-input-number>
    <div style="margin-top:20px;">
      <button vts-button [vtsType]="'primary'" (click)="toggleDisabled()">
        <span>Toggle Disabled</span>
      </button>
    </div>
  `
})
export class VtsDemoInputNumberDisabledComponent {
  demoValue = 3;
  isDisabled = false;

  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
}
