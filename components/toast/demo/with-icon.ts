import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-with-icon',
  template: `
    <button vts-button (click)="createDefaultToast()">Default</button>
    <button vts-button (click)="createSuccessToast()">Success</button>
    <button vts-button (click)="createInfoToast()">Info</button>
    <button vts-button (click)="createWarningToast()">Warning</button>
    <button vts-button (click)="createErrorToast()">Error</button>
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
export class VtsDemoToastWithIconComponent {
  createDefaultToast(): void {
    this.toast.blank(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
    );
  }
  createSuccessToast(): void {
    this.toast.success(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
    );
  }
  createInfoToast(): void {
    this.toast.info(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
    );
  }
  createWarningToast(): void {
    this.toast.warning(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
    );
  }
  createErrorToast(): void {
    this.toast.error(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.'
    );
  }
  constructor(private toast: VtsToastService) {}
}
