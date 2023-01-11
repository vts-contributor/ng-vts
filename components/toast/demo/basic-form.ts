import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-basic-form',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicToast()">
      Basic
    </button>
    <button vts-button [vtsType]="'primary'" (click)="createBasicIconToast()">
      With icon
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
        margin-bottom: 1em
      }
    `
  ]
})
export class VtsDemoToastBasicFormComponent {
  constructor(private toast: VtsToastService) {}

  createBasicToast(): void {
    this.toast
      .create('info',
        'Toast Title',
        'This is the content of the toast. This is the content of the toast. This is the content of the toast.',
        false,
        true
      )
  }
  createBasicIconToast(): void {
    this.toast
      .create('success',
        'Toast Title',
        'This is the content of the toast. This is the content of the toast. This is the content of the toast.',
        true,
        true
      )
  }
}
