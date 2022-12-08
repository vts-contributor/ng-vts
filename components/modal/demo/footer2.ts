/* declarations: VtsModalCustomFooterComponent */

import { Component } from '@angular/core';
import { VtsModalRef, VtsModalService } from '@ui-vts/ng-vts/modal';

@Component({
  selector: 'vts-demo-modal-footer2',
  template: `
    <button vts-button vtsType="primary" (click)="showModal1()">
      <span>In Template</span>
    </button>
    <br />
    <br />
    <button vts-button vtsType="primary" (click)="showModal2()">
      <span>In Component</span>
    </button>
    <vts-modal
      [(vtsVisible)]="isVisible"
      vtsTitle="Custom Modal Title"
      (vtsOnCancel)="handleCancel()"
    >
      <div *vtsModalContent>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
        <p>Modal Content</p>
      </div>
      <div *vtsModalFooter>
        <span>Modal Footer:</span>
        <button vts-button vtsType="default" (click)="handleCancel()">Custom Callback</button>
        <button vts-button vtsType="primary" (click)="handleOk()" [vtsLoading]="isConfirmLoading">
          Custom Submit
        </button>
      </div>
    </vts-modal>
  `,
  styles: []
})
export class VtsDemoModalFooter2Component {
  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalService: VtsModalService) {}

  showModal1(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.modalService.create({
      vtsTitle: 'Modal Title',
      vtsContent: VtsModalCustomFooterComponent
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

@Component({
  selector: 'vts-modal-custom-footer-component',
  template: `
    <div>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
      <p>Modal Content</p>
    </div>
    <div *vtsModalFooter>
      <button vts-button vtsType="default" (click)="destroyModal()">Custom Callback</button>
      <button vts-button vtsType="primary" (click)="destroyModal()">Custom Submit</button>
    </div>
  `
})
export class VtsModalCustomFooterComponent {
  constructor(private modal: VtsModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }
}
