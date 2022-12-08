import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';

import { Subject } from 'rxjs';
import { ApexChartComponent } from './lib/apex-chart/chart.component';
import {
  VtsChart,
  VtsChartDataLabels,
  VtsChartLegend,
  VtsChartOptions,
  VtsChartPlotOptions,
  VtsChartXAxis,
  VtsChartYAxis
} from './typings';

@Component({
  selector: 'vts-vertical-grouped-chart',
  exportAs: 'vtsVerticalGroupedChart',
  template: `
    <div class="vts-chart">
      <apx-chart
        [series]="vtsOptions.series"
        [chart]="_chart"
        [colors]="vtsOptions.colors"
        [labels]="vtsOptions.labels"
        [xaxis]="_xaxis"
        [yaxis]="_yaxis"
        [title]="vtsOptions.title"
        [plotOptions]="plotOptions"
        [dataLabels]="dataLabels"
        [legend]="legend"
        [grid]="grid"
        #apexChart
      ></apx-chart>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-chart-vertical-grouped]': `true`
  }
})
export class VtsVerticalGroupedChartComponent implements OnDestroy, OnInit {
  @Input() vtsOptions!: VtsChartOptions;

  @ViewChild('apexChart') chart!: ApexChartComponent;

  get plotOptions(): VtsChartPlotOptions {
    return {
      bar: {
        barHeight: '75%',
        distributed: true,
        horizontal: true
      }
    };
  }

  get dataLabels(): VtsChartDataLabels {
    const defaultOpts: { [key: string]: any } = {
      enabled: true,
      textAnchor: 'middle',
      formatter: function (val: any, _opt: any) {
        return val;
      },
      style: {
        colors: ['#000'],
        fontSize: '16px',
        fontFamily: 'inherit',
        fontWeigth: '700'
      }
    };

    if (this.vtsOptions?.dataLabels)
      return {
        ...defaultOpts,
        ...this.vtsOptions.dataLabels!
      };
    else {
      return {
        ...defaultOpts
      };
    }
  }

  get legend(): VtsChartLegend {
    return {
      show: false
    };
  }

  get grid(): VtsGridModule {
    return {
      borderColor: '#D1D1D1',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    };
  }

  get _chart(): VtsChart {
    const defaultOpts = {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      events: {
        mounted: function (chartContext: any) {
          const el = chartContext.el as HTMLElement;
          const yaxis = el.querySelector('.apexcharts-yaxis');
          yaxis?.parentNode?.appendChild(yaxis);
        },
        updated: function (chartContext: any) {
          const el = chartContext.el as HTMLElement;
          const yaxis = el.querySelector('.apexcharts-yaxis');
          yaxis?.parentNode?.appendChild(yaxis);
        }
      }
    };
    const chartOpts = this.vtsOptions!.chart!;
    return {
      ...defaultOpts,
      ...chartOpts
    };
  }

  get _xaxis(): VtsChartXAxis {
    const labelStyles = {
      labels: {
        show: false
      }
    };

    if (this.vtsOptions?.xaxis) {
      const opts = this.vtsOptions.xaxis!;
      return {
        ...opts,
        ...labelStyles
      };
    } else {
      return {
        ...labelStyles
      };
    }
  }

  get _yaxis(): VtsChartYAxis {
    const labelStyles = {
      floating: true,
      labels: {
        style: {
          colors: ['#ffffff'],
          fontSize: '16px',
          fontFamily: 'inherit',
          fontWeigth: '800'
        },
        offsetX: 95,
        offsetY: 3
      }
    };

    if (this.vtsOptions?.yaxis) {
      const opts = this.vtsOptions.yaxis!;
      return {
        ...opts,
        ...labelStyles
      };
    } else {
      return {
        ...labelStyles
      };
    }
  }

  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
