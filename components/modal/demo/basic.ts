import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-modal-basic',
  template: `
    <button vts-button [vtsType]="'primary'" (click)="showModal()">
      <span>Show Modal</span>
    </button>
    <vts-modal
      [(vtsVisible)]="isVisible"
      vtsTitle="The first Modal"
      (vtsOnCancel)="handleCancel()"
      (vtsOnOk)="handleOk()"
    >
      <ng-container *vtsModalContent>
        <p>Content one</p>
        <p>Content two</p>
        <p>Content three</p>
      </ng-container>
    </vts-modal>
  `
})
export class VtsDemoModalBasicComponent {
  isVisible = false;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
