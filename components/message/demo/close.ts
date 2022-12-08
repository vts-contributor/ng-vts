import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-message-close',
  template: `
    <button vts-button [vtsType]="'default'" (click)="startShowMessages()">
      Display a sequence of messages
    </button>
  `
})
export class VtsDemoMessageCloseComponent {
  constructor(private message: VtsMessageService) {}

  startShowMessages(): void {
    this.message
      .loading('Action in progress', { vtsDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this.message.success('Loading finished', { vtsDuration: 2500 }).onClose!),
        concatMap(
          () =>
            this.message.info('Loading finished is finished', {
              vtsDuration: 2500
            }).onClose!
        )
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }
}
