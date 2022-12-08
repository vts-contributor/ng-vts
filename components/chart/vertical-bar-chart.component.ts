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
  selector: 'vts-vertical-bar-chart',
  exportAs: 'vtsVerticalBarChart',
  template: `
    <div class="vts-chart">
      <apx-chart
        [series]="vtsOptions.series"
        [chart]="_chart"
        [colors]="vtsOptions.colors"
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
    '[class.vts-chart-vertical-bar]': `true`
  }
})
export class VtsVerticalBarChartComponent implements OnDestroy, OnInit {
  @Input() vtsOptions!: VtsChartOptions;

  @ViewChild('apexChart') chart!: ApexChartComponent;

  get plotOptions(): VtsChartPlotOptions {
    return {
      bar: {
        columnWidth: '43%',
        distributed: true
      }
    };
  }

  get dataLabels(): VtsChartDataLabels {
    return {
      enabled: false
    };
  }

  get legend(): VtsChartLegend {
    return {
      show: false
    };
  }

  get grid(): VtsGridModule {
    return {
      borderColor: '#D1D1D1'
    };
  }

  get _chart(): VtsChart {
    const defaultOpts = {
      toolbar: {
        show: false
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
        style: {
          colors: ['#385A64'],
          fontSize: '16px',
          fontFamily: 'inherit',
          fontWeigth: '500'
        },
        offsetY: 3
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
      labels: {
        style: {
          colors: ['#385A64'],
          fontSize: '16px',
          fontFamily: 'inherit',
          fontWeigth: '500'
        },
        offsetX: -15,
        offsetY: 5
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
