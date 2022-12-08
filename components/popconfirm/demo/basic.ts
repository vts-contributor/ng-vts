import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-popconfirm-basic',
  template: `
    <a
      vts-popconfirm
      vtsPopconfirmTitle="Are you sure delete this task?"
      vtsPopconfirmPlacement="bottom"
      (vtsOnConfirm)="confirm()"
      (vtsOnCancel)="cancel()"
    >
      Delete
    </a>
  `
})
export class VtsDemoPopconfirmBasicComponent {
  cancel(): void {
    this.vtsMessageService.info('click cancel');
  }

  confirm(): void {
    this.vtsMessageService.info('click confirm');
  }

  constructor(private vtsMessageService: VtsMessageService) {}
}
