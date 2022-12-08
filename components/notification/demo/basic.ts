import { Component } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-basic',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicNotification()">
      Open the notification box
    </button>
  `
})
export class VtsDemoNotificationBasicComponent {
  constructor(private notification: VtsNotificationService) {}

  createBasicNotification(): void {
    this.notification
      .blank(
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }
}
