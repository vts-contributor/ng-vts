import { Component } from '@angular/core';
import { VtsChartOptions } from '@ui-vts/ng-vts/chart';

@Component({
  selector: 'vts-demo-chart-line',
  template: `
    <vts-line-chart [vtsOptions]="chartOptions"></vts-line-chart>
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
export class VtsDemoChartLineComponent {
  chartOptions: VtsChartOptions = {
    series: [
      {
        name: 'Network',
        data: [
          {
            x: 0,
            y: 210
          },
          {
            x: 3,
            y: 180
          },
          {
            x: 6,
            y: 90
          },
          {
            x: 9,
            y: 180
          },
          {
            x: 12,
            y: 200
          },
          {
            x: 15,
            y: 150
          },
          {
            x: 18,
            y: 100
          },
          {
            x: 21,
            y: 70
          },
          {
            x: 24,
            y: 145
          }
        ]
      }
    ],
    chart: {
      type: 'area',
      height: 350
    },
    colors: ['#C65312'],
    fill: {
      colors: ['#C0CFD3', '#C0CFD3']
    },
    markers: {
      size: 5,
      colors: ['#F80035']
    },
    xaxis: {
      min: 0,
      max: 24,
      tickAmount: 9,
      overwriteCategories: Array.from({ length: 9 }).map((_, idx) => `${idx * 3}h`)
    },
    title: {
      text: 'Line Chart Title',
      align: 'left'
    }
  };
}
