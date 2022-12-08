import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-modal-position',
  template: `
    <button vts-button vtsType="primary" (click)="showModalTop()">
      Display a modal dialog at 20px to Top
    </button>
    <vts-modal
      [vtsStyle]="{ top: '20px' }"
      [(vtsVisible)]="isVisibleTop"
      vtsTitle="20px to Top"
      (vtsOnCancel)="handleCancelTop()"
      (vtsOnOk)="handleOkTop()"
    >
      <ng-container *vtsModalContent>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </ng-container>
    </vts-modal>

    <br />
    <br />

    <button vts-button vtsType="primary" (click)="showModalMiddle()">
      Vertically centered modal dialog
    </button>
    <vts-modal
      [(vtsVisible)]="isVisibleMiddle"
      vtsTitle="Vertically centered modal dialog"
      vtsCentered
      (vtsOnCancel)="handleCancelMiddle()"
      (vtsOnOk)="handleOkMiddle()"
    >
      <ng-container *vtsModalContent>
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </ng-container>
    </vts-modal>
  `
})
export class VtsDemoModalPositionComponent {
  isVisibleTop = false;
  isVisibleMiddle = false;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkTop(): void {
    console.log('点击了确定');
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
}
