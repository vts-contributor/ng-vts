import { Component, TemplateRef } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-custom-icon',
  template: `
    <ng-template #template>
      <div class="vts-notification-notice-content">
        <div class="vts-notification-notice-with-icon">
          <span class="vts-notification-notice-icon">
            <i vts-icon vtsType="Face" style="color: rgb(16, 142, 233);"></i>
          </span>
          <div class="vts-notification-notice-message">Notification Title</div>
          <div class="vts-notification-notice-description">
            This is the content of the notification. This is the content of the notification. This
            is the content of the notification.
          </div>
        </div>
      </div>
    </ng-template>
    <button vts-button [vtsType]="'primary'" (click)="createBasicNotification(template)">
      Open the notification box
    </button>
  `
})
export class VtsDemoNotificationCustomIconComponent {
  constructor(private notification: VtsNotificationService) {}

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
