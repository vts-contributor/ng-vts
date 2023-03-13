import { Component } from '@angular/core';
import { VtsChartOptions } from '@ui-vts/ng-vts/chart';

@Component({
  selector: 'vts-demo-chart-vertical-grouped',
  template: `
    <vts-vertical-grouped-chart [vtsOptions]="chartOptions"></vts-vertical-grouped-chart>
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
export class VtsDemoChartVerticalGroupedComponent {
  chartOptions: VtsChartOptions = {
    series: [
      {
        name: 'Value',
        data: [200, 350, 390, 432, 321, 199]
      }
    ],
    chart: {
      type: 'bar',
      height: 270
    },
    colors: ['#FF9466', '#D9733A', '#DBA816', '#AF8612', '#CB002B', '#AD0025'],
    labels: ['Option 01', 'Option 02', 'Option 03', 'Option 04', 'Option 05', 'Option 06'],
    title: {
      text: 'Vertical Grouped Chart Title',
      align: 'left'
    }
  };
}
