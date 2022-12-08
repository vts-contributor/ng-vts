import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-statistic-unit',
  template: `
    <vts-row [vtsGutter]="16">
      <vts-col [vtsSpan]="12">
        <vts-statistic
          [vtsValue]="(1128 | number)!"
          [vtsTitle]="'Feedback'"
          [vtsPrefix]="prefixTpl"
        ></vts-statistic>
        <ng-template #prefixTpl><i vts-icon vtsType="like"></i></ng-template>
      </vts-col>
      <vts-col [vtsSpan]="12">
        <vts-statistic
          [vtsValue]="93"
          [vtsTitle]="'Unmerged'"
          [vtsSuffix]="'/ 100'"
        ></vts-statistic>
      </vts-col>
    </vts-row>
  `
})
export class VtsDemoStatisticUnitComponent {}
