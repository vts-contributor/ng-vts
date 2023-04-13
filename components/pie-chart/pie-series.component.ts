import {
  Component,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { max } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { ViewDimensions, StyleTypes, PlacementTypes, ColorHelper, formatLabel, escapeLabel, StringOrNumberOrDate } from '@ui-vts/ng-vts/core/chart';
import { VtsPieChartData, VtsPieChartItem } from './types';

@Component({
  selector: 'g[vts-charts-pie-series]',
  template: `
    <svg:g *ngFor="let arc of data; trackBy: trackBy">
      <!--
      <svg:g
        vts-charts-pie-label-outter
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="labelText(arc)"
        [labelTrim]="trimLabels"
        [labelTrimSize]="maxLabelLength"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices"
        [animations]="animations"
      ></svg:g>
      -->
      <svg:g
        vts-charts-pie-arc
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [gradient]="gradient"
        [data]="arc.data"
        [max]="max"
        [explodeSlices]="explodeSlices"
        [isActive]="isActive(arc.data)"
        [animate]="animations"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
        (dblclick)="dblclick.emit($event)"
        vts-charts-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="placementTypes.Top"
        [tooltipType]="styleTypes.tooltip"
        [tooltipTitle]="getTooltipTitle(arc)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="arc.data"
      ></svg:g>
      <svg:g
        vts-charts-pie-label-inner
        *ngIf="labelVisible(arc)"
        [data]="arc"
        [radius]="outerRadius"
        [color]="color(arc)"
        [label]="labelText(arc)"
        [labelTrim]="trimLabels"
        [labelTrimSize]="maxLabelLength"
        [max]="max"
        [value]="arc.value"
        [explodeSlices]="explodeSlices"
        [animations]="animations"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsPieSeriesComponent implements OnChanges {
  @Input() colors!: ColorHelper;
  @Input() series: VtsPieChartItem[] = [];
  @Input() dims!: ViewDimensions;
  @Input() innerRadius: number = 60;
  @Input() outerRadius: number = 80;
  @Input() explodeSlices!: boolean;
  @Input() showLabels!: boolean;
  @Input() gradient!: boolean;
  @Input() activeEntries!: VtsPieChartItem[];
  @Input() labelFormatting?: (name: StringOrNumberOrDate) => string;;
  @Input() trimLabels: boolean = true;
  @Input() maxLabelLength: number = 10;
  @Input() tooltipText?: (o: VtsPieChartData) => string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate?: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() dblclick = new EventEmitter();

  max!: number;
  data!: VtsPieChartData[];

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    const pieGenerator = pie<any, VtsPieChartItem>()
      .value(d => d.value)
      .sort(null);

    const arcData = pieGenerator(this.series) as VtsPieChartData[]

    this.max = max(arcData, d => {
      return d.value;
    })!;

    this.data = this.calculateLabelPositions(arcData);
    this.tooltipText = this.tooltipText || this.defaultTooltipText;
  }

  midAngle(d: VtsPieChartData): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  outerArc(): any {
    const factor = 1.5;

    return arc()
      .innerRadius(this.outerRadius * factor)
      .outerRadius(this.outerRadius * factor);
  }

  calculateLabelPositions(pieData: VtsPieChartData[]): any {
    const factor = 1.5;
    const minDistance = 10;
    const labelPositions = pieData;

    labelPositions.forEach(d => {
      d.pos = this.outerArc().centroid(d);
      d.pos[0] = factor * this.outerRadius * (this.midAngle(d) < Math.PI ? 1 : -1);
    });

    for (let i = 0; i < labelPositions.length - 1; i++) {
      const a = labelPositions[i];
      if (!this.labelVisible(a)) {
        continue;
      }

      for (let j = i + 1; j < labelPositions.length; j++) {
        const b = labelPositions[j];
        if (!this.labelVisible(b)) {
          continue;
        }
        // if they're on the same side
        if (b.pos[0] * a.pos[0] > 0) {
          // if they're overlapping
          const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
          if (o > 0) {
            // push the second up or down
            b.pos[1] += Math.sign(b.pos[0]) * o;
          }
        }
      }
    }

    return labelPositions;
  }

  labelVisible(myArc: VtsPieChartData): boolean {
    return this.showLabels && myArc.endAngle - myArc.startAngle > Math.PI / 30;
  }

  getTooltipTitle(a: VtsPieChartData) {
    return this.tooltipTemplate ? undefined : this.tooltipText?.(a);
  }

  labelText(myArc: VtsPieChartData): string {
    if (this.labelFormatting) {
      return this.labelFormatting(myArc.data.name);
    }
    return this.label(myArc);
  }

  label(myArc: VtsPieChartData): string {
    return formatLabel(myArc.data.name);
  }

  defaultTooltipText(myArc: VtsPieChartData): string {
    const label = this.label(myArc);
    const val = formatLabel(myArc.data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }

  color(myArc: VtsPieChartData): string {
    return this.colors.getColor(this.label(myArc));
  }

  trackBy(_index: number, item: VtsPieChartData) {
    return item.data.name;
  }

  onClick(data: VtsPieChartItem): void {
    this.select.emit(data);
  }

  isActive(entry: VtsPieChartItem): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name
    });
    return item !== undefined;
  }
}
