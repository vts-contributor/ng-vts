import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-aggregate',
  template: `
    <vts-row [vtsGutter]="16">
      <vts-col [vtsSpan]="6">
        <vts-statistic
          [vtsValue]="[7, 8, 2, 3] | vtsAggregate : 'max'"
          [vtsTitle]="'Max [7, 8, 2, 3]'"
        ></vts-statistic>
      </vts-col>
      <vts-col [vtsSpan]="6">
        <vts-statistic
          [vtsValue]="[7, 8, 2, 3] | vtsAggregate : 'min'"
          [vtsTitle]="'Min [7, 8, 2, 3]'"
        ></vts-statistic>
      </vts-col>
      <vts-col [vtsSpan]="6">
        <vts-statistic
          [vtsValue]="[7, 8, 2, 3] | vtsAggregate : 'sum'"
          [vtsTitle]="'Sum [7, 8, 2, 3]'"
        ></vts-statistic>
      </vts-col>
      <vts-col [vtsSpan]="6">
        <vts-statistic
          [vtsValue]="[7, 8, 2, 3] | vtsAggregate : 'avg'"
          [vtsTitle]="'Avg [7, 8, 2, 3]'"
        ></vts-statistic>
      </vts-col>
    </vts-row>
  `
})
export class VtsDemoPipesAggregateComponent {}
