import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-modal-async',
  template: `
    <button vts-button vtsType="primary" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <vts-modal
      [(vtsVisible)]="isVisible"
      vtsTitle="Modal Title"
      (vtsOnCancel)="handleCancel()"
      (vtsOnOk)="handleOk()"
      [vtsOkLoading]="isOkLoading"
    >
      <p *vtsModalContent>Modal Content</p>
    </vts-modal>
  `
})
export class VtsDemoModalAsyncComponent {
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
