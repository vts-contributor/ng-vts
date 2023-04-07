import { isPlatformServer } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { arc } from 'd3-shape';

import { TextAnchor, trimLabel } from '@ui-vts/ng-vts/core/chart';
import { VtsPieChartData } from './types';



@Component({
  selector: 'g[ngx-charts-pie-label]',
  template: `
    <title>{{ label }}</title>
    <svg:g [attr.transform]="attrTransform" [style.transform]="styleTransform" [style.transition]="textTransition">
      <svg:text
        class="pie-label"
        [class.animation]="animations"
        dy=".35em"
        [style.textAnchor]="textAnchor()"
        [style.shapeRendering]="'crispEdges'"
      >
        {{ labelTrim ? trimLabel(label, labelTrimSize) : label }}
      </svg:text>
    </svg:g>
    <svg:path
      [attr.d]="line"
      [attr.stroke]="color"
      fill="none"
      class="pie-label-line line"
      [class.animation]="animations"
    ></svg:path>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieLabelComponent implements OnChanges {
  @Input() data!: VtsPieChartData;
  @Input() radius: number = 0;
  @Input() label: string = '';
  @Input() color: string = '';
  @Input() max: number = 0;
  @Input() value: number = 0;
  @Input() explodeSlices: boolean = false;
  @Input() animations: boolean = true;
  @Input() labelTrim: boolean = true;
  @Input() labelTrimSize: number = 10;

  trimLabel: (label: string, max?: number) => string;
  line!: string;
  styleTransform: string | null = null;
  attrTransform: string | null = null;
  textTransition: string | null = null;

  constructor(@Inject(PLATFORM_ID) public platformId: any) {
    this.trimLabel = trimLabel;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setTransforms();
    this.update();
  }

  setTransforms() {
    if (isPlatformServer(this.platformId)) {
      this.styleTransform = `translate3d(${this.textX}px,${this.textY}px, 0)`;
      this.attrTransform = `translate(${this.textX},${this.textY})`;
      this.textTransition = !this.animations ? null : 'transform 0.75s';
    } else {
      const isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
      this.styleTransform = isIE ? null : `translate3d(${this.textX}px,${this.textY}px, 0)`;
      this.attrTransform = !isIE ? null : `translate(${this.textX},${this.textY})`;
      this.textTransition = isIE || !this.animations ? null : 'transform 0.75s';
    }
  }

  update(): void {
    let startRadius = this.radius;
    if (this.explodeSlices) {
      startRadius = (this.radius * this.value) / this.max;
    }

    const innerArc = arc().innerRadius(startRadius).outerRadius(startRadius);

    // Calculate innerPos then scale outer position to match label position
    const innerPos = innerArc.centroid(this.data);

    let scale = this.data.pos[1] / innerPos[1];
    if (this.data.pos[1] === 0 || innerPos[1] === 0) {
      scale = 1;
    }
    const outerPos = [scale * innerPos[0], scale * innerPos[1]];

    this.line = `M${innerPos}L${outerPos}L${this.data.pos}`;
  }

  get textX(): number {
    return this.data.pos[0];
  }

  get textY(): number {
    return this.data.pos[1];
  }

  textAnchor(): TextAnchor {
    return this.midAngle(this.data) < Math.PI ? TextAnchor.Start : TextAnchor.End;
  }

  midAngle(d: VtsPieChartData): number {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }
}
