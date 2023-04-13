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
import { BaseChartComponent, VtsChartColorScaleType, ViewDimensions, ColorHelper, calculateViewDimensions, StringOrNumberOrDate, VtsChartColorPreset, VtsChartColor, VtsChartLegendPosition, VtsChartLegendOptions } from '@ui-vts/ng-vts/core/chart';
import { VtsPieChartData, VtsPieChartItem } from './types';

@Component({
  selector: 'vts-charts-pie-chart',
  template: `
    <vts-charts-chart
      [view]="[width, height]"
      [showLegend]="vtsLegend"
      [legendOptions]="legendOptions"
      [activeEntries]="vtsActiveEntries"
      [animations]="vtsAnimations"
      (legendLabelActivate)="onActivate($event, true)"
      (legendLabelDeactivate)="onDeactivate($event, true)"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g [attr.transform]="translation" class="vts-pie-chart">
        <svg:g
          vts-charts-pie-series
          [colors]="colors"
          [series]="data"
          [showLabels]="vtsLabels"
          [labelFormatting]="vtsLabelFormatting"
          [trimLabels]="vtsTrimLabels"
          [maxLabelLength]="vtsMaxLabelLength"
          [activeEntries]="vtsActiveEntries"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [explodeSlices]="vtsExplodeSlices"
          [gradient]="vtsGradient"
          [animations]="vtsAnimations"
          [tooltipDisabled]="vtsTooltipDisabled"
          [tooltipTemplate]="vtsTooltipTemplate"
          [tooltipText]="vtsTooltipText"
          (dblclick)="vtsDblclick.emit($event)"
          (select)="onClick($event)"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
        />
      </svg:g>
    </vts-charts-chart>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsPieChartComponent extends BaseChartComponent {
  @Input() override vtsData: VtsPieChartItem[] = []
  @Input() vtsLabels: boolean = false;
  @Input() vtsLegend: boolean = false;
  @Input() vtsLegendTitle: string | null = null;
  @Input() vtsLegendPosition = VtsChartLegendPosition.Right;
  @Input() vtsLegendColumns?: number
  @Input() vtsExplodeSlices: boolean = false;
  @Input() vtsDoughnut: boolean = false;
  @Input() vtsArcWidth: number = 0.25;
  @Input() vtsGradient: boolean = false;
  @Input() vtsActiveEntries: VtsPieChartItem[] = [];
  @Input() vtsTooltipDisabled: boolean = false;
  @Input() vtsLabelFormatting?: (name: StringOrNumberOrDate) => string;
  @Input() vtsTrimLabels: boolean = true;
  @Input() vtsMaxLabelLength: number = 10;
  @Input() vtsMargins: number[] = [];
  @Input() vtsColors: VtsChartColorPreset | VtsChartColor = VtsChartColorPreset.Natural
  @Input() vtsTooltipText?: (o: VtsPieChartData) => string;
  @Output() vtsDblclick = new EventEmitter();
  @Output() vtsSelect = new EventEmitter<VtsPieChartItem | string>();
  @Output() vtsActivate = new EventEmitter<{value: VtsPieChartItem, entries: VtsPieChartItem[]}>();
  @Output() vtsDeactivate = new EventEmitter<{value: VtsPieChartItem, entries: VtsPieChartItem[]}>();

  @ContentChild('tooltipTemplate') vtsTooltipTemplate?: TemplateRef<any>;

  translation!: string;
  outerRadius!: number;
  innerRadius!: number;
  data: VtsPieChartItem[] = [];
  colors!: ColorHelper;
  domain: string[] = [];
  dims!: ViewDimensions;
  legendOptions!: VtsChartLegendOptions;

  override update(): void {
    super.update();

    if (this.vtsLabels && this.hasNoOptionalMarginsSet()) {
      this.vtsMargins = [30, 80, 30, 80];
    } else if (!this.vtsLabels && this.hasNoOptionalMarginsSet()) {
      // default value for margins
      this.vtsMargins = [20, 20, 20, 20];
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.vtsMargins,
      showLegend: this.vtsLegend,
      legendPosition: this.vtsLegendPosition
    });

    this.formatDates();

    const xOffset = this.vtsMargins[3] + this.dims.width / 2;
    const yOffset = this.vtsMargins[0] + this.dims.height / 2;
    this.translation = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(this.dims.width, this.dims.height);
    if (this.vtsLabels) {
      // make room for vtsLabels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2;
    }
    this.innerRadius = 0;
    if (this.vtsDoughnut) {
      this.innerRadius = this.outerRadius * (1 - this.vtsArcWidth);
    }

    this.domain = this.getDomain();

    // sort data according to domain
    this.data = this.vtsData.sort((a, b) => {
      return this.domain.indexOf(a.name) - this.domain.indexOf(b.name);
    });

    this.setColors();
    this.legendOptions = this.getLegendOptions();
  }

  getDomain(): string[] {
    return this.vtsData.map(d => d.label!);
  }

  onClick(data: VtsPieChartItem | string): void {
    this.vtsSelect.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.vtsColors, VtsChartColorScaleType.Ordinal, this.domain, this.vtsCustomColors);
  }

  getLegendOptions(): VtsChartLegendOptions {
    return {
      scaleType: VtsChartColorScaleType.Ordinal,
      domain: this.domain,
      colors: this.colors,
      title: this.vtsLegendTitle,
      position: this.vtsLegendPosition,
      columns: this.vtsLegendColumns
    };
  }

  onActivate(item: {name: VtsPieChartItem['name'], value?: VtsPieChartItem['value']}, fromLegend = false): void {
    item = this.vtsData.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    })!;

    const idx = this.vtsActiveEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value });
    if (idx > -1) {
      return;
    }

    this.vtsActiveEntries = [item as VtsPieChartItem, ...this.vtsActiveEntries];
    this.vtsActivate.emit({ value: item as VtsPieChartItem, entries: this.vtsActiveEntries });
  }

  onDeactivate(item: {name: VtsPieChartItem['name'], value?: VtsPieChartItem['value']}, fromLegend = false): void {
    item = this.vtsData.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    })!;

    const idx = this.vtsActiveEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value});

    this.vtsActiveEntries.splice(idx, 1);
    this.vtsActiveEntries = [...this.vtsActiveEntries];

    this.vtsDeactivate.emit({ value: item as VtsPieChartItem, entries: this.vtsActiveEntries });
  }

  private hasNoOptionalMarginsSet(): boolean {
    return !this.vtsMargins || this.vtsMargins.length <= 0;
  }
}
