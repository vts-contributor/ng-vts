import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-segment',
  template: `
    <vts-progress
      vts-tooltip
      vtsTitle="3 done / 3 in progress / 4 to do"
      [vtsPercent]="60"
      [vtsSuccessPercent]="30"
    ></vts-progress>
    <vts-progress
      vts-tooltip
      vtsTitle="3 done / 3 in progress / 4 to do"
      vtsType="circle"
      [vtsPercent]="60"
      [vtsSuccessPercent]="30"
    ></vts-progress>
    <vts-progress
      vts-tooltip
      vtsTitle="3 done / 3 in progress / 4 to do"
      vtsType="dashboard"
      [vtsPercent]="60"
      [vtsSuccessPercent]="30"
    ></vts-progress>
  `
})
export class VtsDemoProgressSegmentComponent {}
