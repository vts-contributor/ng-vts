import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-spin-nested',
  template: `
    <vts-spin [vtsSpinning]="isSpinning">
      <vts-alert
        [vtsType]="'info'"
        [vtsMessage]="'Alert message title'"
        [vtsDescription]="'Further details about the context of this alert.'"
      ></vts-alert>
    </vts-spin>
    <br />
    <div>
      Loading state：
      <vts-switch [(ngModel)]="isSpinning"></vts-switch>
    </div>
  `
})
export class VtsDemoSpinNestedComponent {
  isSpinning = false;
}
