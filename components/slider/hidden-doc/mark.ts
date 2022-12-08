import { Component } from '@angular/core';
import { VtsMarks } from '@ui-vts/ng-vts/slider';

@Component({
  selector: 'vts-demo-slider-mark',
  template: `
    <div>
      <h4>included=true</h4>
      <vts-slider [vtsMarks]="marks" [ngModel]="37"></vts-slider>
      <vts-slider [vtsMarks]="marks" vtsIncluded vtsRange [ngModel]="[26, 37]"></vts-slider>
      <h4>included=false</h4>
      <vts-slider [vtsMarks]="marks" [vtsIncluded]="false" [ngModel]="37"></vts-slider>
      <h4>marks & step</h4>
      <vts-slider [vtsMarks]="marks" [vtsStep]="10" [ngModel]="37"></vts-slider>
      <h4>step=null || dots=true</h4>
      <vts-slider [vtsMarks]="marks" [vtsStep]="null" [ngModel]="37"></vts-slider>
      <vts-slider [vtsMarks]="marks" vtsDots [ngModel]="37"></vts-slider>
      Change vtsMarks dynamically:
      <button vts-button (click)="changeMarks()">Change vtsMarks</button>
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
export class VtsDemoSliderMarkComponent {
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

  changeMarks(): void {
    this.marks = {
      20: '20%',
      99: '99%'
    };
  }
}
