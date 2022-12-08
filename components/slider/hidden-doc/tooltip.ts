import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-tooltip',
  template: `
    <vts-slider [vtsTooltipVisible]="'always'"></vts-slider>
    <vts-slider [vtsTooltipVisible]="'never'"></vts-slider>
  `
})
export class VtsDemoSliderTooltipComponent {}
