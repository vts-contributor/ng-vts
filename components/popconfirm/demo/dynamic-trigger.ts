import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

@Component({
  selector: 'vts-demo-popconfirm-dynamic-trigger',
  template: `
    <a
      vts-popconfirm
      vtsPopconfirmTitle="Are you sure delete this task?"
      [vtsCondition]="switchValue"
      (vtsOnConfirm)="confirm()"
      (vtsOnCancel)="cancel()"
    >
      Delete a task
    </a>
    <br />
    <br />
    Whether directly execute:
    <vts-switch [(ngModel)]="switchValue"></vts-switch>
  `
})
export class VtsDemoPopconfirmDynamicTriggerComponent {
  switchValue = false;

  cancel(): void {
    this.vtsMessageService.info('click cancel');
  }

  confirm(): void {
    this.vtsMessageService.info('click confirm');
  }

  constructor(private vtsMessageService: VtsMessageService) {}
}
