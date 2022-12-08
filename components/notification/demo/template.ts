import { Component, TemplateRef, ViewChild } from '@angular/core';
import { VtsNotificationService } from '@ui-vts/ng-vts/notification';

@Component({
  selector: 'vts-demo-notification-template',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="ninja()">Open the notification box</button>
    <ng-template let-fruit="data">
      It's a
      <vts-tag [vtsColor]="fruit.color">{{ fruit.name }}</vts-tag>
      <button vts-button vtsSize="sm">Cut It!</button>
    </ng-template>
  `,
  styles: [
    `
      button {
        margin-top: 8px;
      }
    `
  ]
})
export class VtsDemoNotificationTemplateComponent {
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<{}>;

  ninja(): void {
    const fruits = [
      { name: 'Apple', color: 'red' },
      { name: 'Orange', color: 'orange' },
      { name: 'Watermelon', color: 'green' }
    ];

    fruits.forEach(fruit => {
      this.notificationService.template(this.template!, { vtsData: fruit });
    });
  }

  constructor(private notificationService: VtsNotificationService) {}
}
