import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-input-number',
  template: `
    <vts-row>
      <vts-col vtsSpan="12">
        <vts-slider [vtsMin]="1" [vtsMax]="20" [(ngModel)]="value1"></vts-slider>
      </vts-col>
      <div vts-col vtsSpan="4">
        <vts-input-number
          [vtsMin]="1"
          [vtsMax]="20"
          [ngStyle]="{ marginLeft: '16px' }"
          [(ngModel)]="value1"
        ></vts-input-number>
      </div>
    </vts-row>

    <vts-row>
      <vts-col vtsSpan="12">
        <vts-slider [vtsMin]="0" [vtsMax]="1" [vtsStep]="0.01" [(ngModel)]="value2"></vts-slider>
      </vts-col>
      <vts-col vtsSpan="4">
        <vts-input-number
          [vtsMin]="0"
          [vtsMax]="1"
          [ngStyle]="{ marginLeft: '16px' }"
          [vtsStep]="0.01"
          [(ngModel)]="value2"
        ></vts-input-number>
      </vts-col>
    </vts-row>
  `
})
export class VtsDemoSliderInputNumberComponent {
  value1 = 1;
  value2 = 0;
}
