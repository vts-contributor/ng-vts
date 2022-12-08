import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-statistic-countdown',
  template: `
    <vts-row [vtsGutter]="16">
      <vts-col [vtsSpan]="12">
        <vts-countdown [vtsValue]="deadline" [vtsTitle]="'Countdown'"></vts-countdown>
      </vts-col>
      <vts-col [vtsSpan]="12">
        <vts-countdown
          [vtsValue]="deadline"
          [vtsTitle]="'Million Seconds'"
          [vtsFormat]="'HH:mm:ss:SSS'"
        ></vts-countdown>
      </vts-col>
      <vts-col [vtsSpan]="24" style="margin-top: 32px;">
        <vts-countdown
          [vtsValue]="deadline"
          [vtsTitle]="'Day Level'"
          [vtsFormat]="'D 天 H 时 m 分 s 秒'"
        ></vts-countdown>
      </vts-col>
    </vts-row>
  `
})
export class VtsDemoStatisticCountdownComponent {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
}
