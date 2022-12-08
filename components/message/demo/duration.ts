import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-message-duration',
  template: `
    <button vts-button [vtsType]="'default'" (click)="createBasicMessage()">
      Customized display duration
    </button>
  `
})
export class VtsDemoMessageDurationComponent {
  createBasicMessage(): void {
    this.message.success(
      'This is a prompt message for success, and it will disappear in 10 seconds',
      {
        vtsDuration: 10000
      }
    );
  }

  constructor(private message: VtsMessageService) {}
}
