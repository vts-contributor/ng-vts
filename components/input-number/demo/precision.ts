import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-precision',
  template: `
    <vts-input-number
      [(ngModel)]="toFixedValue"
      [vtsPrecision]="precision"
      vtsPlaceHolder="toFixed"
    ></vts-input-number>
    <vts-input-number
      [(ngModel)]="cutValue"
      [vtsPrecision]="precision"
      vtsPrecisionMode="cut"
      vtsPlaceHolder="cut off"
    ></vts-input-number>
    <vts-input-number
      [(ngModel)]="customFnValue"
      [vtsPrecision]="precision"
      [vtsPrecisionMode]="customPrecisionFn"
      vtsPlaceHolder="cut off"
    ></vts-input-number>
  `,
  styles: [
    `
      vts-input-number {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoInputNumberPrecisionComponent {
  toFixedValue = 2;
  cutValue = 2;
  customFnValue = 2;
  precision = 2;
  customPrecisionFn(value: string | number, precision?: number): number {
    return +Number(value).toFixed(precision! + 1);
  }
}
