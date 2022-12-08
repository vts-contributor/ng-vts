import { Component } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-duration',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicNotification()">
      Open the notification box
    </button>
  `
})
export class VtsDemoNotificationDurationComponent {
  createBasicNotification(): void {
    this.notification.blank(
      'Notification Title',
      'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      { vtsDuration: 0 }
    );
  }

  constructor(private notification: VtsNotificationService) {}
}
