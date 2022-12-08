import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { ApexChartComponent } from './lib/apex-chart/chart.component';
import {
  VtsChartDataLabels,
  VtsChartLegend,
  VtsChartOptions,
  VtsChartPlotOptions,
  VtsChartStates,
  VtsChartStroke,
  VtsDonutOptions
} from './typings';

@Component({
  selector: 'vts-donut-chart',
  exportAs: 'vtsDonutChart',
  template: `
    <div class="vts-chart">
      <apx-chart
        [series]="vtsOptions.series"
        [chart]="vtsOptions.chart"
        [labels]="vtsOptions.labels"
        [responsive]="vtsOptions.responsive"
        [colors]="vtsOptions.colors"
        [title]="vtsOptions.title"
        [plotOptions]="plotOptions"
        [dataLabels]="dataLabels"
        [stroke]="stroke"
        [legend]="legend"
        [states]="states"
        #apexChart
      ></apx-chart>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-chart-donut]': `true`
  }
})
export class VtsDonutChartComponent implements OnDestroy, OnInit {
  @Input() vtsOptions!: VtsChartOptions;
  @Input() donutChartOptions: VtsDonutOptions = {};

  @ViewChild('apexChart') chart!: ApexChartComponent;

  get plotOptions(): VtsChartPlotOptions {
    let name = {};
    let value = {};
    let total = {};
    if (this.donutChartOptions.title) {
      name = {
        show: true,
        offsetY: 8,
        formatter: () => this.donutChartOptions.title
      };
    }

    if (this.donutChartOptions!.subtitle) {
      value = {
        show: true,
        formatter: () => this.donutChartOptions.subtitle
      };

      total = {
        show: true,
        formatter: () => this.donutChartOptions.subtitle
      };
    }

    const show = !!this.donutChartOptions!.subtitle || !!this.donutChartOptions!.title;

    return {
      pie: {
        expandOnClick: false,
        donut: {
          size: '50%',
          background: 'transparent',
          labels: {
            show: show,
            name,
            value,
            total: {
              showAlways: show,
              ...total
            }
          }
        }
      }
    };
  }

  get dataLabels(): VtsChartDataLabels {
    return {
      style: {
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: 'inherit'
      },
      formatter: val => {
        return `${val}%`;
      },

      background: {
        enabled: false,
        dropShadow: {
          enabled: false
        }
      }
    };
  }

  get stroke(): VtsChartStroke {
    return {
      width: 2
    };
  }

  get legend(): VtsChartLegend {
    return {
      fontSize: '16px',
      fontFamily: 'inherit',
      fontWeight: '500',
      markers: {
        width: 16,
        height: 16,
        offsetX: -5,
        offsetY: 3
      },
      itemMargin: {
        horizontal: 0,
        vertical: 8
      },
      offsetX: 30
    };
  }

  get states(): VtsChartStates {
    return {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'lighten',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'lighten',
          value: 0
        }
      }
    };
  }

  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
