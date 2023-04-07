import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@ui-vts/ng-vts/core/chart';
import { PieArcComponent } from './pie-arc.component';
import { PieChartComponent } from './pie-chart.component';
import { PieLabelComponent } from './pie-label.component';
import { PieSeriesComponent } from './pie-series.component';

@NgModule({
  imports: [BidiModule, CommonModule, ChartCommonModule],
  exports: [PieChartComponent],
  declarations: [
    PieArcComponent,
    PieLabelComponent,
    PieSeriesComponent,
    PieChartComponent
  ]
})
export class VtsPieChartModule {}
