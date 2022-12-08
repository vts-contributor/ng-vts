import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-controller',
  template: `
    <p style="margin-bottom: 20px;">
      <label vts-checkbox [(ngModel)]="isCheckedButton" [vtsDisabled]="isDisabledButton">
        {{ isCheckedButton ? 'Checked' : 'Unchecked' }} -
        {{ isDisabledButton ? 'Disabled' : 'Enabled' }}
      </label>
    </p>
    <p>
      <button vts-button [vtsType]="'primary'" (click)="checkButton()" [vtsSize]="'sm'">
        {{ !isCheckedButton ? 'Checked' : 'Unchecked' }}
      </button>
      <button vts-button [vtsType]="'primary'" (click)="disableButton()" [vtsSize]="'sm'">
        {{ isDisabledButton ? 'Enabled' : 'Disabled' }}
      </button>
    </p>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoCheckboxControllerComponent {
  isCheckedButton = true;
  isDisabledButton = false;

  checkButton(): void {
    this.isCheckedButton = !this.isCheckedButton;
  }

  disableButton(): void {
    this.isDisabledButton = !this.isDisabledButton;
  }
}
