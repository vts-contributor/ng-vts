import { Component } from '@angular/core';
import { VtsChartOptions } from '@ui-vts/ng-vts/chart';

@Component({
  selector: 'vts-demo-chart-vertical-bar',
  template: `
    <vts-vertical-bar-chart [vtsOptions]="chartOptions"></vts-vertical-bar-chart>
  `,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `
  ]
})
export class VtsDemoChartVerticalBarComponent {
  chartOptions: VtsChartOptions = {
    series: [
      {
        name: 'distibuted',
        data: [115, 49, 74, 89, 66, 34, 92, 116, 92, 94]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#51737D'],
    xaxis: {
      categories: Array.from({ length: 10 }).map((_, _i) => `${_i.toString().padStart(2, '0')}/12`)
    },
    title: {
      text: 'Vertical Bar Chart Title',
      align: 'left'
    }
  };
}
