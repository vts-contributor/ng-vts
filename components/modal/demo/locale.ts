import { Component } from '@angular/core';
import { VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-locale',
  template: `
    <div>
      <button vts-button vtsType="primary" (click)="showModal()">Modal</button>
      <vts-modal
        [(vtsVisible)]="isVisible"
        vtsTitle="Modal"
        vtsOkText="Ok"
        vtsCancelText="Cancel"
        (vtsOnOk)="handleOk()"
        (vtsOnCancel)="handleCancel()"
      >
        <ng-container *vtsModalContent>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
          <p>Bla bla ...</p>
        </ng-container>
      </vts-modal>
    </div>
    <br />
    <button vts-button vtsType="primary" (click)="showConfirm()">Confirm</button>
  `
})
export class VtsDemoModalLocaleComponent {
  isVisible = false;

  constructor(private modalService: VtsModalService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(): void {
    this.modalService.confirm({
      vtsTitle: 'Confirm',
      vtsContent: 'Bla bla ...',
      vtsOkText: 'OK',
      vtsCancelText: 'Cancel'
    });
  }
}
