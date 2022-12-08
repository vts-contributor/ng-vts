import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-line',
  template: `
    <vts-progress [vtsPercent]="30"></vts-progress>
    <vts-progress [vtsPercent]="50" vtsStatus="active"></vts-progress>
    <vts-progress [vtsPercent]="70" vtsStatus="exception"></vts-progress>
    <vts-progress [vtsPercent]="100"></vts-progress>
    <vts-progress [vtsPercent]="50" [vtsShowInfo]="false"></vts-progress>
  `
})
export class VtsDemoProgressLineComponent {}
