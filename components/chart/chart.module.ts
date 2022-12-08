import { NgModule } from '@angular/core';
import { VtsDonutChartComponent } from './donut-chart.component';
import { VtsVerticalBarChartComponent } from './vertical-bar-chart.component';
import { ApexChartComponent } from './lib/apex-chart/chart.component';
import { VtsVerticalLineChartComponent } from './vertical-line-chart.component';
import { VtsLineChartComponent } from './line-chart.component';
import { VtsVerticalGroupedChartComponent } from './vertical-grouped-chart.component';

@NgModule({
  imports: [],
  declarations: [
    ApexChartComponent,
    VtsDonutChartComponent,
    VtsVerticalBarChartComponent,
    VtsVerticalLineChartComponent,
    VtsLineChartComponent,
    VtsVerticalGroupedChartComponent
  ],
  exports: [
    VtsDonutChartComponent,
    VtsVerticalBarChartComponent,
    VtsVerticalLineChartComponent,
    VtsLineChartComponent,
    VtsVerticalGroupedChartComponent
  ]
})
export class VtsChartModule {}
