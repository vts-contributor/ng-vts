import { Component } from '@angular/core';
import { VtsToastPlacement, VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-placement',
  template: `
    <button vts-button (click)="createBasicToast('topLeft')" vtsType="primary">
      <i vts-icon vtsType="radius-upleft"></i>
      topLeft
    </button>
    <button vts-button (click)="createBasicToast('topRight')" vtsType="primary">
      <i vts-icon vtsType="radius-upright"></i>
      topRight
    </button>
    <vts-divider></vts-divider>
    <button vts-button (click)="createBasicToast('bottomLeft')" vtsType="primary">
      <i vts-icon vtsType="radius-bottomleft"></i>
      bottomLeft
    </button>
    <button vts-button (click)="createBasicToast('bottomRight')" vtsType="primary">
      <i vts-icon vtsType="radius-bottomright"></i>
      bottomRight
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class VtsDemoToastPlacementComponent {
  
  createBasicToast(position: VtsToastPlacement): void {
    this.toast.blank(
      'Toast Title',
      'This is the content of the toast. This is the content of the toast. This is the content of the toast.',
      { vtsPlacement: position }
    );
  }

  constructor(private toast: VtsToastService) {}
}
