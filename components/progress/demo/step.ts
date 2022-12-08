import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-step',
  template: `
    <vts-progress [vtsPercent]="50" [vtsSteps]="3" vtsStrokeColor="#1890ff"></vts-progress>
    <vts-progress [vtsPercent]="30" [vtsSteps]="5" vtsStrokeColor="#1890ff"></vts-progress>
    <vts-progress
      [vtsPercent]="100"
      [vtsSteps]="5"
      vtsStrokeColor="#1890ff"
      vtsSize="small"
    ></vts-progress>
  `
})
export class VtsDemoProgressStepComponent {}
