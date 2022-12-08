import { Component } from '@angular/core';
import { VtsNotificationPlacement, VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-placement',
  template: `
    <button vts-button (click)="createBasicNotification('topLeft')" vtsType="primary">
      <i vts-icon vtsType="radius-upleft"></i>
      topLeft
    </button>
    <button vts-button (click)="createBasicNotification('topRight')" vtsType="primary">
      <i vts-icon vtsType="radius-upright"></i>
      topRight
    </button>
    <vts-divider></vts-divider>
    <button vts-button (click)="createBasicNotification('bottomLeft')" vtsType="primary">
      <i vts-icon vtsType="radius-bottomleft"></i>
      bottomLeft
    </button>
    <button vts-button (click)="createBasicNotification('bottomRight')" vtsType="primary">
      <i vts-icon vtsType="radius-bottomright"></i>
      bottomRight
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class VtsDemoNotificationPlacementComponent {
  placement = 'topRight';

  createBasicNotification(position: VtsNotificationPlacement): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { vtsPlacement: position }
    );
  }

  constructor(private notification: VtsNotificationService) {}
}
