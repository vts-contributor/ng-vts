import { Component } from '@angular/core';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-toast-fill',
  template: `
    <div vts-space [vtsPreset]="2" vtsWrap>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('success')">
        Success
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('error')">
        Error
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('info')">
        Info
      </button>
      <button *vtsSpaceItem vts-button [vtsType]="'default'" (click)="createToast('warning')">
        Warning
      </button>
    </div>
  `
})
export class VtsDemoToastFillComponent {
  constructor(private toast: VtsToastService) {}

  createToast(type: 'success' | 'error' | 'info' | 'warning'): void {
    this.toast.create(
      type,
      'Toast Title',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    );
  }
}
