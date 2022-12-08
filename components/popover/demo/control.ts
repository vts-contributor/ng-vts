import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-control',
  template: `
    <button
      vts-button
      vtsType="primary"
      vts-popover
      vtsPopoverTitle="Title"
      [(vtsPopoverVisible)]="visible"
      (vtsPopoverVisibleChange)="change($event)"
      vtsPopoverTrigger="click"
      [vtsPopoverContent]="contentTemplate"
    >
      Click me
    </button>
    <ng-template #contentTemplate>
      <a (click)="clickMe()">Close</a>
    </ng-template>
  `
})
export class VtsDemoPopoverControlComponent {
  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
