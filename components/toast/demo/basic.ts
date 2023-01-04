import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-basic',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicToast()">
      Open the toast box
    </button>
  `

})
export class VtsDemoToastBasicComponent {
  constructor(private toast: VtsToastService) {}

  createBasicToast(): void {
    this.toast
      .blank(
        'Toast Title',
        'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
      )
  }
}
