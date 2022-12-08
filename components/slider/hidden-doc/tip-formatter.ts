import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-tip-formatter',
  template: `
    <vts-slider [vtsTipFormatter]="formatter"></vts-slider>
    <vts-slider [vtsTipFormatter]="null"></vts-slider>
  `
})
export class VtsDemoSliderTipFormatterComponent {
  formatter(value: number): string {
    return `${value}%`;
  }
}
