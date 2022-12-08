import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-progress-line-mini',
  template: `
    <div style="width: 170px;">
      <vts-progress [vtsPercent]="30" vtsSize="small"></vts-progress>
      <vts-progress [vtsPercent]="50" vtsSize="small" vtsStatus="active"></vts-progress>
      <vts-progress [vtsPercent]="70" vtsSize="small" vtsStatus="exception"></vts-progress>
      <vts-progress [vtsPercent]="100" vtsSize="small"></vts-progress>
      <vts-progress [vtsPercent]="50" vtsSize="small" [vtsShowInfo]="false"></vts-progress>
    </div>
  `
})
export class VtsDemoProgressLineMiniComponent {}
