import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-message-other',
  template: `
    <button vts-button (click)="createMessage('success')">Success</button>
    <button vts-button (click)="createMessage('error')">Error</button>
    <button vts-button (click)="createMessage('warning')">Warning</button>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoMessageOtherComponent {
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  constructor(private message: VtsMessageService) {}
}
