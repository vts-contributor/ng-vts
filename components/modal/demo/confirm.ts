import { Component } from '@angular/core';
import { VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-confirm',
  template: `
    <button vts-button vtsType="primary" (click)="showConfirm()">Confirm</button>
    <button vts-button vtsType="default" (click)="showDeleteConfirm()">Delete</button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoModalConfirmComponent {
  constructor(private modal: VtsModalService) {}

  showConfirm(): void {
    this.modal.confirm({
      vtsTitle: '<i>Do you Want to delete these items?</i>',
      vtsContent: '<b>Some descriptions</b>',
      vtsOnOk: () => console.log('OK')
    });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      vtsTitle: 'Are you sure delete this task?',
      vtsContent: '<b style="color: red;">Some descriptions</b>',
      vtsOkText: 'Yes',
      vtsOkType: 'primary',
      vtsOkDanger: true,
      vtsOnOk: () => console.log('OK'),
      vtsCancelText: 'No',
      vtsOnCancel: () => console.log('Cancel')
    });
  }
}
