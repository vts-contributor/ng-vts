import { Component } from '@angular/core';
import { VtsModalRef, VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-confirm-promise',
  template: `
    <button vts-button vtsType="primary" (click)="showConfirm()">Confirm</button>
  `
})
export class VtsDemoModalConfirmPromiseComponent {
  confirmModal?: VtsModalRef; // For testing by now

  constructor(private modal: VtsModalService) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      vtsTitle: 'Do you Want to delete these items?',
      vtsContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      vtsOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
