import { Component, TemplateRef } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-with-btn',
  template: `
    <ng-template #template let-notification>
      <div class="vts-notification-notice-content">
        <div>
          <div class="vts-notification-notice-message">Notification Title</div>
          <div class="vts-notification-notice-description">
            A function will be be called after the notification is closed (automatically after the
            "duration" time of manually).
          </div>
          <span class="vts-notification-notice-btn">
            <button vts-button vtsType="primary" vtsSize="sm" (click)="notification.close()">
              <span>Confirm</span>
            </button>
          </span>
        </div>
      </div>
    </ng-template>
    <button vts-button [vtsType]="'primary'" (click)="createBasicNotification(template)">
      Open the notification box
    </button>
  `
})
export class VtsDemoNotificationWithBtnComponent {
  constructor(private notification: VtsNotificationService) {}

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
