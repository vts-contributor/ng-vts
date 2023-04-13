import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';

@Component({
  selector: 'g[vts-charts-x-axis]',
  template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        vts-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        vts-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="orientation.Bottom"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnChanges {
  @Input() xScale: any;
  @Input() dims!: ViewDimensions;
  @Input() trimTicks: boolean = false;
  @Input() rotateTicks: boolean = false;
  @Input() maxTickLength: number = 0;
  @Input() tickFormatting: any;
  @Input() showGridLines = false;
  @Input() showLabel: boolean = true;
  @Input() labelText: string = '';
  @Input() ticks: any[] = [];
  @Input() xAxisTickCount: number = 0;
  @Input() xOrient: Orientation = Orientation.Bottom;
  @Input() xAxisOffset: number = 0;

  @Output() dimensionsChanged = new EventEmitter();

  xAxisClassName: string = 'x axis';

  tickArguments: number[] = [];
  transform: string = '';
  labelOffset: number = 0;
  fill: string = 'none';
  stroke: string = 'stroke';
  tickStroke: string = '#ccc';
  strokeWidth: string = 'none';
  padding: number = 5;

  readonly orientation = Orientation;

  @ViewChild(XAxisTicksComponent) ticksComponent!: XAxisTicksComponent;

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;

    if (typeof this.xAxisTickCount !== 'undefined') {
      this.tickArguments = [this.xAxisTickCount];
    }
  }

  emitTicksHeight({ height }: {height: number}): void {
    const newLabelOffset = height + 25 + 5;
    if (newLabelOffset !== this.labelOffset) {
      this.labelOffset = newLabelOffset;
      setTimeout(() => {
        this.dimensionsChanged.emit({ height });
      }, 0);
    }
  }
}
