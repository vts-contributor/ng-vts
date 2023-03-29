import { Component } from '@angular/core';
import { VtsChartOptions } from '@ui-vts/ng-vts/chart';

@Component({
  selector: 'vts-demo-chart-vertical-line',
  template: `
    <vts-vertical-line-chart [vtsOptions]="chartOptions"></vts-vertical-line-chart>
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
export class VtsDemoChartVerticalLineComponent {
  chartOptions: VtsChartOptions = {
    series: [
      {
        name: 'New request',
        type: 'column',
        data: [376, 220, 288, 152, 272, 210, 330]
      },
      {
        name: 'Request processed',
        type: 'line',
        data: [320, 205, 260, 140, 300, 195, 220]
      }
    ],
    colors: ['#CB002B', '#385A64'],
    chart: {
      type: 'line',
      height: 350
    },
    labels: ['29/11', '30/11', '01/12', '02/12', '03/12', '04/12', '05/12'],
    title: {
      text: 'Vertical Line Chart Title',
      align: 'left'
    }
  };
}
