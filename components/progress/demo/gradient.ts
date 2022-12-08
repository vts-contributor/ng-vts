import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-gradient',
  template: `
    <vts-progress
      [vtsPercent]="99.9"
      [vtsStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }"
    ></vts-progress>
    <vts-progress
      [vtsPercent]="99.9"
      [vtsStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }"
      vtsStatus="active"
    ></vts-progress>
    <vts-progress
      vtsType="circle"
      [vtsPercent]="90"
      [vtsStrokeColor]="{
        '0%': '#108ee9',
        '50%': '#2db7f5',
        '100%': '#87d068'
      }"
    ></vts-progress>
    <vts-progress
      vtsType="dashboard"
      [vtsPercent]="100"
      [vtsStrokeColor]="{ '0%': '#108ee9', '100%': '#87d068' }"
    ></vts-progress>
  `,
  styles: [
    `
      .vts-progress {
        margin-right: 8px;
        margin-bottom: 8px;
        display: inline-block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class VtsDemoProgressGradientComponent {}
