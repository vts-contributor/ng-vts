import { Component } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-update',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createAutoUpdatingNotifications()">
      Open the notification box
    </button>
  `
})
export class VtsDemoNotificationUpdateComponent {
  constructor(private notification: VtsNotificationService) {}

  createAutoUpdatingNotifications(): void {
    this.notification.blank('Notification Title', 'Description.', {
      vtsKey: 'key'
    });

    setTimeout(() => {
      this.notification.blank('New Title', 'New description', {
        vtsKey: 'key'
      });
    }, 1000);
  }
}
