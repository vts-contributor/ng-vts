import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  SimpleChanges
} from '@angular/core';
import { TooltipService } from '../tooltip/tooltip.service';
import { VtsChartLegendOptions, VtsChartLegendType, VtsChartLegendPosition } from '../types/legend.model';
import { VtsChartColorScaleType } from '../types/scale-type.enum';

@Component({
  providers: [TooltipService],
  selector: 'vts-charts-chart',
  template: `
    <div class="vts-charts-outer"
      [style.width.px]="view[0]"
      [style.height.px]="!isHorizontal ? view[1] : null"
    >
      <svg class="vts-charts" 
        [attr.width]="chartWidth" 
        [attr.height]="view[1]"
      >
        <ng-content></ng-content>
      </svg>
      <vts-charts-scale-legend
        *ngIf="showLegend && legendType === LegendType.ScaleLegend"
        class="vts-charts-legend"
        [horizontal]="isHorizontal"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </vts-charts-scale-legend>
      <vts-charts-legend
        *ngIf="showLegend && legendType === LegendType.Legend"
        class="vts-charts-legend"
        [horizontal]="isHorizontal"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </vts-charts-legend>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {
  @Input() view!: [number, number];
  @Input() showLegend: boolean = false;
  @Input() legendOptions!: VtsChartLegendOptions;
  @Input() legendType!: VtsChartLegendType;
  @Input() activeEntries: any[] = [];
  @Input() animations: boolean = true;

  @Output() legendLabelClick = new EventEmitter<string>();
  @Output() legendLabelActivate = new EventEmitter<{name: string}>();
  @Output() legendLabelDeactivate = new EventEmitter<{name: string}>();

  chartWidth: number = 0;
  title: string = '';
  legendWidth: number = 0;

  readonly LegendPosition = VtsChartLegendPosition;
  readonly LegendType = VtsChartLegendType;

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let legendColumns = 0;
    if (this.showLegend) {
      this.legendType = this.getLegendType();

      if (!this.legendOptions || this.legendOptions.position === VtsChartLegendPosition.Right) {
        if (this.legendOptions.columns)
          legendColumns = this.legendOptions.columns
        else if (this.legendType === VtsChartLegendType.ScaleLegend) {
          legendColumns = 1;
        } else {
          legendColumns = 2;
        }
      }
    }

    const chartColumns = 12 - legendColumns;

    this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
    this.legendWidth =
      !this.legendOptions || this.legendOptions.position === VtsChartLegendPosition.Right
        ? Math.floor((this.view[0] * legendColumns) / 12.0)
        : this.chartWidth;
  }

  getLegendType(): VtsChartLegendType {
    return this.legendOptions.scaleType === VtsChartColorScaleType.Linear ? VtsChartLegendType.ScaleLegend : VtsChartLegendType.Legend;
  }

  get isHorizontal() {
    return this.legendOptions && this.legendOptions.position === this.LegendPosition.Below
  }
}
