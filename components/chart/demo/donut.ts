import { Component } from '@angular/core';
import { VtsChartOptions, VtsDonutOptions } from '@ui-vts/ng-vts/chart';

@Component({
  selector: 'vts-demo-chart-donut',
  template: `
    <vts-donut-chart
      [vtsOptions]="chartOptions"
      [donutChartOptions]="donutChartOptions"
    ></vts-donut-chart>
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
export class VtsDemoChartDonutComponent {
  chartOptions: VtsChartOptions = {
    series: [50, 34, 96, 20],
    chart: {
      type: 'donut',
      width: 510,
      height: 220
    },
    colors: ['#708C95', '#385A64', '#004E7A', '#F88240'],
    labels: ['No process', 'Processing', 'Processed', 'Out of date'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Donut Chart Title',
      align: 'center'
    }
  };

  donutChartOptions: VtsDonutOptions = {
    title: '25.145',
    subtitle: 'Offers'
  };
}
