import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-round',
  template: `
    <vts-progress vtsStrokeLinecap="round" vtsPercent="75"></vts-progress>
    <vts-progress vtsStrokeLinecap="round" vtsType="circle" vtsPercent="75"></vts-progress>
    <vts-progress vtsStrokeLinecap="square" vtsType="dashboard" vtsPercent="75"></vts-progress>
  `
})
export class VtsDemoProgressRoundComponent {}
