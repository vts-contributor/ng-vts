import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-circle-mini',
  template: `
    <vts-progress [vtsPercent]="75" vtsType="circle" [vtsWidth]="80"></vts-progress>
    <vts-progress
      [vtsPercent]="70"
      vtsType="circle"
      [vtsWidth]="80"
      vtsStatus="exception"
    ></vts-progress>
    <vts-progress [vtsPercent]="100" vtsType="circle" [vtsWidth]="80"></vts-progress>
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
export class VtsDemoProgressCircleMiniComponent {}
