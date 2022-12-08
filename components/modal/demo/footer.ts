import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-modal-footer',
  template: `
    <button vts-button vtsType="primary" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <vts-modal
      [(vtsVisible)]="isVisible"
      [vtsTitle]="modalTitle"
      [vtsContent]="modalContent"
      [vtsFooter]="modalFooter"
      (vtsOnCancel)="handleCancel()"
    >
      <ng-template #modalTitle>Custom Modal Title</ng-template>

      <ng-template #modalContent>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
      </ng-template>

      <ng-template #modalFooter>
        <span>Modal Footer:</span>
        <button vts-button vtsType="default" (click)="handleCancel()">Custom Callback</button>
        <button vts-button vtsType="primary" (click)="handleOk()" [vtsLoading]="isConfirmLoading">
          Custom Submit
        </button>
      </ng-template>
    </vts-modal>
  `
})
export class VtsDemoModalFooterComponent {
  isVisible = false;
  isConfirmLoading = false;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
