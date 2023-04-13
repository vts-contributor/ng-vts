import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-charts-scale-legend',
  template: `
    <div
      class="vts-charts-scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleLegendComponent implements OnChanges {
  @Input() valueRange: number[] = [];
  @Input() colors: any;
  @Input() height: number = 0;
  @Input() width: number = 0;
  @Input() horizontal: boolean = false;

  gradient: string = '';

  ngOnChanges(_changes: SimpleChanges): void {
    const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
    const direction = this.horizontal ? 'right' : 'bottom';
    this.gradient = `linear-gradient(to ${direction}, ${gradientValues})`;
  }

  /**
   * Generates the string used in the gradient stylesheet properties
   * @param colors array of colors
   * @param splits array of splits on a scale of (0, 1)
   */
  gradientString(colors: string[], splits: number[]): string {
    // add the 100%
    splits.push(1);
    const pairs: string[] = [];
    colors.reverse().forEach((c, i) => {
      pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
    });

    return pairs.join(', ');
  }
}
