import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-circle',
  template: `
    <vts-progress [vtsPercent]="75" vtsType="circle"></vts-progress>
    <vts-progress [vtsPercent]="70" vtsType="circle" vtsStatus="exception"></vts-progress>
    <vts-progress [vtsPercent]="100" vtsType="circle"></vts-progress>
  `,
  styles: [
    `
      vts-progress {
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
      }
    `
  ]
})
export class VtsDemoProgressCircleComponent {}
