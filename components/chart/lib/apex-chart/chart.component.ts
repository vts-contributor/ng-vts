import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  VtsChartAnnotations,
  VtsChartAxisSeries,
  VtsChart,
  VtsChartDataLabels,
  VtsChartFill,
  VtsChartGrid,
  VtsChartLegend,
  VtsChartNonAxisSeries,
  VtsChartMarkers,
  VtsChartNoData,
  VtsChartPlotOptions,
  VtsChartResponsive,
  VtsChartStates,
  VtsChartStroke,
  VtsChartTheme,
  VtsChartTitleSubtitle,
  VtsChartTooltip,
  VtsChartXAxis,
  VtsChartYAxis
} from '../../typings';
import { asapScheduler } from 'rxjs';
// @ts-ignore
import VtsCharts from 'apexcharts/dist/apexcharts.esm';

@Component({
  selector: 'apx-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApexChartComponent implements OnInit, OnChanges, OnDestroy {
  // Origin

  @Input() chart?: VtsChart;
  @Input() annotations?: VtsChartAnnotations;
  @Input() colors?: any[];
  @Input() dataLabels?: VtsChartDataLabels;
  @Input() series?: VtsChartAxisSeries | VtsChartNonAxisSeries;
  @Input() stroke?: VtsChartStroke;
  @Input() labels?: string[];
  @Input() legend?: VtsChartLegend;
  @Input() markers?: VtsChartMarkers;
  @Input() noData?: VtsChartNoData;
  @Input() fill?: VtsChartFill;
  @Input() tooltip?: VtsChartTooltip;
  @Input() plotOptions?: VtsChartPlotOptions;
  @Input() responsive?: VtsChartResponsive[];
  @Input() xaxis?: VtsChartXAxis;
  @Input() yaxis?: VtsChartYAxis | VtsChartYAxis[];
  @Input() grid?: VtsChartGrid;
  @Input() states?: VtsChartStates;
  @Input() title?: VtsChartTitleSubtitle;
  @Input() subtitle?: VtsChartTitleSubtitle;
  @Input() theme?: VtsChartTheme;

  @Input() autoUpdateSeries = true;

  @ViewChild('chart', { static: true }) private chartElement!: ElementRef;
  private chartObj: any;

  ngOnInit() {
    asapScheduler.schedule(() => {
      this.createElement();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    asapScheduler.schedule(() => {
      if (this.autoUpdateSeries && Object.keys(changes).filter(c => c !== 'series').length === 0) {
        this.updateSeries(this.series, true);
        return;
      }

      this.createElement();
    });
  }

  ngOnDestroy() {
    if (this.chartObj) {
      this.chartObj.destroy();
    }
  }

  private createElement() {
    const options: any = {};

    if (this.annotations) {
      options.annotations = this.annotations;
    }
    if (this.chart) {
      options.chart = this.chart;
    }
    if (this.colors) {
      options.colors = this.colors;
    }
    if (this.dataLabels) {
      options.dataLabels = this.dataLabels;
    }
    if (this.series) {
      options.series = this.series;
    }
    if (this.stroke) {
      options.stroke = this.stroke;
    }
    if (this.labels) {
      options.labels = this.labels;
    }
    if (this.legend) {
      options.legend = this.legend;
    }
    if (this.fill) {
      options.fill = this.fill;
    }
    if (this.tooltip) {
      options.tooltip = this.tooltip;
    }
    if (this.plotOptions) {
      options.plotOptions = this.plotOptions;
    }
    if (this.responsive) {
      options.responsive = this.responsive;
    }
    if (this.markers) {
      options.markers = this.markers;
    }
    if (this.noData) {
      options.noData = this.noData;
    }
    if (this.xaxis) {
      options.xaxis = this.xaxis;
    }
    if (this.yaxis) {
      options.yaxis = this.yaxis;
    }
    if (this.grid) {
      options.grid = this.grid;
    }
    if (this.states) {
      options.states = this.states;
    }
    if (this.title) {
      options.title = this.title;
    }
    if (this.subtitle) {
      options.subtitle = this.subtitle;
    }
    if (this.theme) {
      options.theme = this.theme;
    }

    if (this.chartObj) {
      this.chartObj.destroy();
    }

    this.chartObj = new VtsCharts(this.chartElement.nativeElement, options);

    this.render();
  }

  public render(): Promise<void> {
    return this.chartObj.render();
  }

  public updateOptions(
    options: any,
    redrawPaths?: boolean,
    animate?: boolean,
    updateSyncedCharts?: boolean
  ): Promise<void> {
    return this.chartObj.updateOptions(options, redrawPaths, animate, updateSyncedCharts);
  }

  public updateSeries(newSeries?: VtsChartAxisSeries | VtsChartNonAxisSeries, animate?: boolean) {
    this.chartObj.updateSeries(newSeries, animate);
  }

  public appendSeries(newSeries?: VtsChartAxisSeries | VtsChartNonAxisSeries, animate?: boolean) {
    this.chartObj.appendSeries(newSeries, animate);
  }

  public appendData(newData: any[]) {
    this.chartObj.appendData(newData);
  }

  public toggleSeries(seriesName: string): any {
    return this.chartObj.toggleSeries(seriesName);
  }

  public showSeries(seriesName: string) {
    this.chartObj.showSeries(seriesName);
  }

  public hideSeries(seriesName: string) {
    this.chartObj.hideSeries(seriesName);
  }

  public resetSeries() {
    this.chartObj.resetSeries();
  }

  public zoomX(min: number, max: number) {
    this.chartObj.zoomX(min, max);
  }

  public toggleDataPointSelection(seriesIndex: number, dataPointIndex?: number) {
    this.chartObj.toggleDataPointSelection(seriesIndex, dataPointIndex);
  }

  public destroy() {
    this.chartObj.destroy();
  }

  public setLocale(localeName?: string) {
    this.chartObj.setLocale(localeName);
  }

  public paper() {
    this.chartObj.paper();
  }

  public addXaxisAnnotation(options: any, pushToMemory?: boolean, context?: any) {
    this.chartObj.addXaxisAnnotation(options, pushToMemory, context);
  }

  public addYaxisAnnotation(options: any, pushToMemory?: boolean, context?: any) {
    this.chartObj.addYaxisAnnotation(options, pushToMemory, context);
  }

  public addPointAnnotation(options: any, pushToMemory?: boolean, context?: any) {
    this.chartObj.addPointAnnotation(options, pushToMemory, context);
  }

  public removeAnnotation(id: string, options?: any) {
    this.chartObj.removeAnnotation(id, options);
  }

  public clearAnnotations(options?: any) {
    this.chartObj.clearAnnotations(options);
  }

  public dataURI(): Promise<void> {
    return this.chartObj.dataURI();
  }
}
