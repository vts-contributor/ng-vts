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
  VtsChartFill,
  VtsChartLegend,
  VtsChartMarkers,
  VtsChartOptions,
  VtsChartPlotOptions,
  VtsChartStroke,
  VtsChartTooltip,
  VtsChartXAxis,
  VtsChartYAxis
} from './typings';

@Component({
  selector: 'vts-line-chart',
  exportAs: 'vtsLineChart',
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
        [stroke]="stroke"
        [markers]="markers"
        [fill]="fill"
        [grid]="grid"
        [tooltip]="tooltip"
        #apexChart
      ></apx-chart>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-chart-line]': `true`
  }
})
export class VtsLineChartComponent implements OnDestroy, OnInit {
  @Input() vtsOptions!: VtsChartOptions;

  @ViewChild('apexChart') chart!: ApexChartComponent;

  get plotOptions(): VtsChartPlotOptions {
    return {
      bar: {
        columnWidth: '43%'
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
      show: true,
      fontSize: '14px',
      fontFamily: 'inherit',
      itemMargin: {
        horizontal: 40,
        vertical: 20
      },
      markers: {
        offsetX: -5
      }
    };
  }

  get stroke(): VtsChartStroke {
    return {
      curve: 'straight',
      width: 1
    };
  }

  get grid(): VtsGridModule {
    return {
      borderColor: '#D1D1D1',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    };
  }

  get markers(): VtsChartMarkers {
    const defaultOpts: { [key: string]: any; shape: 'circle' } = {
      size: 5,
      shape: 'circle',
      hover: {
        size: 5
      }
    };

    if (this.vtsOptions?.markers) {
      return {
        ...defaultOpts,
        ...this.vtsOptions?.markers!
      };
    } else {
      return {
        ...defaultOpts
      };
    }
  }

  get fill(): VtsChartFill {
    const defaultOpts: { [key: string]: any } = {
      colors: ['#C0CFD3', '#C0CFD3'],
      type: 'solid',
      opacity: 0.5
    };

    if (this.vtsOptions?.fill) {
      return {
        ...defaultOpts,
        ...this.vtsOptions?.fill!
      };
    } else {
      return {
        ...defaultOpts
      };
    }
  }

  get tooltip(): VtsChartTooltip {
    return {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return `
          <div class="apexcharts-tooltip-box">
          <span>${series[seriesIndex][dataPointIndex]}</span>
          </div>
        `;
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
      },
      tooltip: {
        enabled: false
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
