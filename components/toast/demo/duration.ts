import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-duration',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicToast()">
      Open the toast box
    </button>
  `
})
export class VtsDemoToastDurationComponent {
  createBasicToast(): void {
    this.toast.blank(
      'Toast Title',
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      { vtsDuration: 0 }
    );
  }

  constructor(private toast: VtsToastService) {}
}
