import { Component } from '@angular/core';
import { VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-info',
  template: `
    <button vts-button (click)="info()">Info</button>
    <button vts-button (click)="success()">Success</button>
    <button vts-button (click)="error()">Error</button>
    <button vts-button (click)="warning()">Warning</button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoModalInfoComponent {
  constructor(private modal: VtsModalService) {}

  info(): void {
    this.modal.info({
      vtsTitle: 'This is a notification message',
      vtsContent: '<p>some messages...some messages...</p><p>some messages...some messages...</p>',
      vtsOnOk: () => console.log('Info OK')
    });
  }

  success(): void {
    this.modal.success({
      vtsTitle: 'This is a success message',
      vtsContent: 'some messages...some messages...'
    });
  }

  error(): void {
    this.modal.error({
      vtsTitle: 'This is an error message',
      vtsContent: 'some messages...some messages...'
    });
  }

  warning(): void {
    this.modal.warning({
      vtsTitle: 'This is an warning message',
      vtsContent: 'some messages...some messages...'
    });
  }
}
