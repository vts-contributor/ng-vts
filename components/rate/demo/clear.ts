import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-rate-clear',
  template: `
    <vts-rate [(ngModel)]="value" vtsAllowHalf></vts-rate>
    <span class="vts-rate-text">allowClear: true</span>
    <br />
    <vts-rate [(ngModel)]="value" vtsAllowHalf [vtsAllowClear]="false"></vts-rate>
    <span class="vts-rate-text">allowClear: false</span>
  `
})
export class VtsDemoRateClearComponent {
  value = 0;
}
