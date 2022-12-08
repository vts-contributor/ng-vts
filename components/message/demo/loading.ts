import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-message-loading',
  template: `
    <button vts-button [vtsType]="'default'" (click)="createBasicMessage()">
      Display a loading indicator
    </button>
  `
})
export class VtsDemoMessageLoadingComponent {
  constructor(private message: VtsMessageService) {}

  createBasicMessage(): void {
    const id = this.message.loading('Action in progress..', {
      vtsDuration: 0
    }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
  }
}
