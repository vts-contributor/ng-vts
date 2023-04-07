import { Component } from '@angular/core';
import { VtsPieChartItem } from '../types';

@Component({
  selector: 'vts-demo-pie-chart-basic',
  template: `
    <ngx-charts-pie-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [gradient]="gradient"
      [legend]="showLegend"
      [legendPosition]="legendPosition"
      [labels]="showLabels"
      [doughnut]="isDoughnut"
      (select)="onSelect($event)"
      (activate)="onActivate($event)"
      (deactivate)="onDeactivate($event)"
      >
    </ngx-charts-pie-chart>
  `
})
export class VtsDemoPieChartBasicComponent {
  single: VtsPieChartItem[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ]
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  onSelect(data: VtsPieChartItem): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: VtsPieChartItem): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: VtsPieChartItem): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
