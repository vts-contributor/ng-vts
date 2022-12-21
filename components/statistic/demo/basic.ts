import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-statistic-basic',
  template: `
    <vts-row [vtsGutter]="16">
      <vts-col [vtsSpan]="12">
        <vts-statistic [vtsValue]="(1949101 | number)!" [vtsTitle]="'Active Users'"></vts-statistic>
      </vts-col>
      <vts-col [vtsSpan]="12">
        <vts-statistic
          [vtsValue]="(2019.111 | number : '1.0-2')!"
          [vtsTitle]="'Account Balance (CNY)'"
        ></vts-statistic>
      </vts-col>
    </vts-row>
  `
})
export class VtsDemoStatisticBasicComponent {}
