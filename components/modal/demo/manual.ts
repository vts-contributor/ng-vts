import { Component } from '@angular/core';
import { VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-manual',
  template: `
    <button vts-button (click)="success()">Success</button>
  `
})
export class VtsDemoModalManualComponent {
  constructor(private modalService: VtsModalService) {}

  success(): void {
    const modal = this.modalService.success({
      vtsTitle: 'This is a notification message',
      vtsContent: 'This modal will be destroyed after 1 second'
    });

    setTimeout(() => modal.destroy(), 1000);
  }
}
