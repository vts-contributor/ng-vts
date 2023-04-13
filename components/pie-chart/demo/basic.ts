import { Component } from '@angular/core';
import { VtsPieChartItem, VtsPieChartLegendPosition } from '@ui-vts/ng-vts/pie-chart';

@Component({
  selector: 'vts-demo-pie-chart-basic',
  template: `
    <vts-charts-pie-chart
      [vtsView]="view"
      [vtsScheme]="colorScheme"
      [vtsData]="single"
      [vtsGradient]="gradient"
      [vtsLegend]="showLegend"
      [vtsLegendPosition]="legendPosition"
      [vtsLabels]="showLabels"
      [vtsDoughnut]="isDoughnut"
      (vtsSelect)="onSelect($event)"
      (vtsActivate)="onActivate($event)"
      (vtsDeactivate)="onDeactivate($event)"
      >
    </vts-charts-pie-chart>
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
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = VtsPieChartLegendPosition.Below;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
