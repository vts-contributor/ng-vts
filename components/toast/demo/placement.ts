import { Component } from '@angular/core';
import { VtsToastPlacement, VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-placement',
  template: `
    <div vts-space [vtsPreset]="2" vtsWrap>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('topLeft')">
        Success
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('topRight')">
        Error
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('bottomLeft')">
        Info
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('bottomRight')">
        Warning
      </button>
    </div>
  `
})
export class VtsDemoToastPlacementComponent {
  createToast(position: VtsToastPlacement): void {
    this.toast.create(
      'info',
      'Toast Title',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      {
        vtsPlacement: position
      }
    );
  }

  constructor(private toast: VtsToastService) {}
}
