import { Component } from '@angular/core';
import { VtsMarks } from '@ui-vts/ng-vts/slider';

@Component({
  selector: 'vts-demo-slider-reverse',
  template: `
    <div>
      <vts-slider [ngModel]="30" [vtsReverse]="reverse"></vts-slider>
      <vts-slider vtsRange [ngModel]="[20, 50]" [vtsReverse]="reverse"></vts-slider>
      <vts-slider [vtsMarks]="marks" [ngModel]="30" [vtsReverse]="reverse"></vts-slider>
      Reversed:
      <vts-switch vtsSize="sm" [(ngModel)]="reverse"></vts-switch>
    </div>
  `,
  styles: [
    `
      h4 {
        margin: 0 0 16px;
      }

      .vts-slider-with-marks {
        margin-bottom: 44px;
      }
    `
  ]
})
export class VtsDemoSliderReverseComponent {
  reverse = true;

  marks: VtsMarks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: '<strong>100°C</strong>'
    }
  };
}
