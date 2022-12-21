import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-statistic-card',
  template: `
    <div style="background: #ECECEC; padding: 30px;">
      <vts-row [vtsGutter]="16">
        <vts-col [vtsSpan]="12">
          <vts-card>
            <vts-statistic
              [vtsValue]="(11.28 | number : '1.0-2')!"
              [vtsTitle]="'Active'"
              [vtsPrefix]="prefixTplOne"
              [vtsSuffix]="'%'"
              [vtsValueStyle]="{ color: '#3F8600' }"
            ></vts-statistic>
            <ng-template #prefixTplOne>
              <i vts-icon vtsType="arrow-up"></i>
            </ng-template>
          </vts-card>
        </vts-col>
        <vts-col [vtsSpan]="12">
          <vts-card>
            <vts-statistic
              [vtsValue]="(9.3 | number : '1.0-2')!"
              [vtsTitle]="'Idle'"
              [vtsPrefix]="prefixTplTwo"
              [vtsSuffix]="'%'"
              [vtsValueStyle]="{ color: '#CF1322' }"
            ></vts-statistic>
            <ng-template #prefixTplTwo>
              <i vts-icon vtsType="arrow-down"></i>
            </ng-template>
          </vts-card>
        </vts-col>
      </vts-row>
    </div>
  `
})
export class VtsDemoStatisticCardComponent {}
