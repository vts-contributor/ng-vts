import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-message-info',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="createBasicMessage()">
      Display normal message
    </button>
  `
})
export class VtsDemoMessageInfoComponent {
  constructor(private message: VtsMessageService) {}

  createBasicMessage(): void {
    this.message.info('This is a normal message');
  }
}
