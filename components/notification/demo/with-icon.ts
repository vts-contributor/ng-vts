import { Component } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-with-icon',
  template: `
    <button vts-button (click)="createNotification('success')">Success</button>
    <button vts-button (click)="createNotification('info')">Info</button>
    <button vts-button (click)="createNotification('warning')">Warning</button>
    <button vts-button (click)="createNotification('error')">Error</button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class VtsDemoNotificationWithIconComponent {
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    );
  }

  constructor(private notification: VtsNotificationService) {}
}
