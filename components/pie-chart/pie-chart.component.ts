import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { BaseChartComponent, ScaleType, ViewDimensions, LegendOptions, LegendPosition, ColorHelper, calculateViewDimensions } from '@ui-vts/ng-vts/core/chart';
import { VtsPieChartItem } from './types';

@Component({
  selector: 'ngx-charts-pie-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelActivate)="onActivate($event, true)"
      (legendLabelDeactivate)="onDeactivate($event, true)"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="translation" class="pie-chart chart">
        <svg:g
          ngx-charts-pie-series
          [colors]="colors"
          [series]="data"
          [showLabels]="labels"
          [labelFormatting]="labelFormatting"
          [trimLabels]="trimLabels"
          [maxLabelLength]="maxLabelLength"
          [activeEntries]="activeEntries"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [explodeSlices]="explodeSlices"
          [gradient]="gradient"
          [animations]="animations"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipText]="tooltipText"
          (dblclick)="dblclick.emit($event)"
          (select)="onClick($event)"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss', './pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent extends BaseChartComponent {
  @Input() labels: boolean = false;
  @Input() legend: boolean = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() explodeSlices: boolean = false;
  @Input() doughnut: boolean = false;
  @Input() arcWidth: number = 0.25;
  @Input() gradient: boolean = false;
  @Input() activeEntries: VtsPieChartItem[] = [];
  @Input() tooltipDisabled: boolean = false;
  @Input() labelFormatting: any;
  @Input() trimLabels: boolean = true;
  @Input() maxLabelLength: number = 10;
  @Input() tooltipText?: (o: any) => any;
  @Output() dblclick = new EventEmitter();
  // optional margins
  @Input() margins!: number[];
  @Output() override select = new EventEmitter<VtsPieChartItem | string>();
  @Output() activate = new EventEmitter<{value: VtsPieChartItem, entries: VtsPieChartItem[]}>();
  @Output() deactivate = new EventEmitter<{value: VtsPieChartItem, entries: VtsPieChartItem[]}>();

  @ContentChild('tooltipTemplate') tooltipTemplate?: TemplateRef<any>;

  translation!: string;
  outerRadius!: number;
  innerRadius!: number;
  data: VtsPieChartItem[] = [];
  colors!: ColorHelper;
  domain: string[] = [];
  dims!: ViewDimensions;
  legendOptions!: LegendOptions;

  override update(): void {
    super.update();

    if (this.labels && this.hasNoOptionalMarginsSet()) {
      this.margins = [30, 80, 30, 80];
    } else if (!this.labels && this.hasNoOptionalMarginsSet()) {
      // default value for margins
      this.margins = [20, 20, 20, 20];
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margins,
      showLegend: this.legend,
      legendPosition: this.legendPosition
    });

    this.formatDates();

    const xOffset = this.margins[3] + this.dims.width / 2;
    const yOffset = this.margins[0] + this.dims.height / 2;
    this.translation = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(this.dims.width, this.dims.height);
    if (this.labels) {
      // make room for labels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2;
    }
    this.innerRadius = 0;
    if (this.doughnut) {
      this.innerRadius = this.outerRadius * (1 - this.arcWidth);
    }

    this.domain = this.getDomain();

    // sort data according to domain
    this.data = this.results.sort((a, b) => {
      return this.domain.indexOf(a.name) - this.domain.indexOf(b.name);
    });

    this.setColors();
    this.legendOptions = this.getLegendOptions();
  }

  getDomain(): string[] {
    return this.results.map(d => d.label);
  }

  onClick(data: VtsPieChartItem | string): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, this.domain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    return {
      scaleType: ScaleType.Ordinal,
      domain: this.domain,
      colors: this.colors,
      title: this.legendTitle,
      position: this.legendPosition
    };
  }

  onActivate(item: VtsPieChartItem, fromLegend = false): void {
    item = this.results.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item: VtsPieChartItem, fromLegend = false): void {
    item = this.results.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value});

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  private hasNoOptionalMarginsSet(): boolean {
    return !this.margins || this.margins.length <= 0;
  }
}
