import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-vertical',
  template: `
    <div [ngStyle]="{ height: '300px' }">
      <div [ngStyle]="style">
        <vts-slider vtsVertical [ngModel]="30"></vts-slider>
      </div>
      <div [ngStyle]="style">
        <vts-slider vtsVertical vtsRange [vtsStep]="10" [ngModel]="[20, 50]"></vts-slider>
      </div>
      <div [ngStyle]="style">
        <vts-slider vtsVertical vtsRange [vtsMarks]="marks" [ngModel]="[26, 37]"></vts-slider>
      </div>
    </div>
  `
})
export class VtsDemoSliderVerticalComponent {
  style = {
    float: 'left',
    height: '300px',
    marginLeft: '70px'
  };

  marks = {
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
