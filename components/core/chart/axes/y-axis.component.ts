import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';

@Component({
  selector: 'g[vts-charts-y-axis]',
  template: `
    <svg:g [attr.class]="yAxisClassName" [attr.transform]="transform">
      <svg:g
        vts-charts-y-axis-ticks
        *ngIf="yScale"
        [trimTicks]="trimTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickValues]="ticks"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineWidth]="dims.width"
        [referenceLines]="referenceLines"
        [showRefLines]="showRefLines"
        [showRefLabels]="showRefLabels"
        [height]="dims.height"
        (dimensionsChanged)="emitTicksWidth($event)"
      />

      <svg:g
        vts-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="yOrient"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnChanges {
  @Input() yScale: any;
  @Input() dims!: ViewDimensions;
  @Input() trimTicks: boolean = false;
  @Input() maxTickLength: number = 0;
  @Input() tickFormatting: any;
  @Input() ticks: any[] = [];
  @Input() showGridLines: boolean = false;
  @Input() showLabel: boolean = false;
  @Input() labelText: string = '';
  @Input() yAxisTickCount: any;
  @Input() yOrient: Orientation = Orientation.Left;
  @Input() referenceLines: any;
  @Input() showRefLines: boolean = false;
  @Input() showRefLabels: boolean = false;
  @Input() yAxisOffset: number = 0;
  @Output() dimensionsChanged = new EventEmitter();

  yAxisClassName: string = 'y axis';
  tickArguments: number[] = [];
  offset: number = 0;
  transform: string = '';
  labelOffset: number = 15;
  fill: string = 'none';
  stroke: string = '#CCC';
  tickStroke: string = '#CCC';
  strokeWidth: number = 1;
  padding: number = 5;

  @ViewChild(YAxisTicksComponent) ticksComponent!: YAxisTicksComponent;

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.offset = -(this.yAxisOffset + this.padding);
    if (this.yOrient === Orientation.Right) {
      this.labelOffset = 65;
      this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
      this.transform = `translate(${this.offset} , 0)`;
    }

    if (this.yAxisTickCount !== undefined) {
      this.tickArguments = [this.yAxisTickCount];
    }
  }

  emitTicksWidth({ width }: {width: number}): void {
    if (width !== this.labelOffset && this.yOrient === Orientation.Right) {
      this.labelOffset = width + this.labelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
      }, 0);
    } else if (width !== this.labelOffset) {
      this.labelOffset = width;
      setTimeout(() => {
        this.dimensionsChanged.emit({ width });
      }, 0);
    }
  }
}
