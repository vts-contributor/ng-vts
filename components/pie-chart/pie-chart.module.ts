import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@ui-vts/ng-vts/core/chart';
import { VtsPieArcComponent } from './pie-arc.component';
import { VtsPieChartComponent } from './pie-chart.component';
import { VtsPieLabelInnerComponent } from './pie-label-inner.component';
import { VtsPieLabelOutterComponent } from './pie-label-outter.component';
import { VtsPieSeriesComponent } from './pie-series.component';

@NgModule({
  imports: [
    BidiModule, 
    CommonModule, 
    ChartCommonModule
  ],
  exports: [VtsPieChartComponent],
  declarations: [
    VtsPieArcComponent,
    VtsPieLabelOutterComponent,
    VtsPieLabelInnerComponent,
    VtsPieSeriesComponent,
    VtsPieChartComponent
  ]
})
export class VtsPieChartModule {}
