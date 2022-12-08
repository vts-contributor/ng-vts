import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-css-unit',
  template: `
    <vts-slider [(ngModel)]="radiusValue" [vtsMax]="100" [vtsMin]="0"></vts-slider>

    <div class="wrap">
      <div class="box" [style.border-radius]="radiusValue | vtsToCssUnit">Default</div>
      <div class="box" [style.border-radius]="radiusValue | vtsToCssUnit: '%'">%</div>
      <div class="box" [style.border-radius]="radiusValue | vtsToCssUnit: 'rem'">rem</div>
    </div>
  `,
  styles: [
    `
      .wrap {
        display: flex;
      }
      .box {
        margin-top: 20px;
        margin-right: 20px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        width: 50px;
        height: 50px;
        background: #4183c4;
      }
    `
  ]
})
export class VtsDemoPipesCssUnitComponent {
  radiusValue = 0;
}
