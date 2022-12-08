import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-dashboard',
  template: `
    <vts-progress [vtsPercent]="75" vtsType="dashboard"></vts-progress>
  `
})
export class VtsDemoProgressDashboardComponent {}
