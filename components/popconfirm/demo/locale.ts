import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-popconfirm-locale',
  template: `
    <a
      vts-popconfirm
      vtsPopconfirmTitle="Are you sure?"
      vtsOkText="ok"
      vtsCancelText="cancel"
      (vtsOnConfirm)="confirm()"
      (vtsOnCancel)="cancel()"
    >
      delete
    </a>
  `
})
export class VtsDemoPopconfirmLocaleComponent {
  cancel(): void {
    this.vtsMessageService.info('click cancel');
  }

  confirm(): void {
    this.vtsMessageService.info('click confirm');
  }

  constructor(private vtsMessageService: VtsMessageService) {}
}
