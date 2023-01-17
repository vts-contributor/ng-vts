import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-duration',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createToast()">Open</button>
  `
})
export class VtsDemoToastDurationComponent {
  createToast(): void {
    this.toast.success('Toast Title', 'I will never close automatically.', { vtsDuration: 0 });
  }

  constructor(private toast: VtsToastService) {}
}
