import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-number-formatter',
  template: `
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="100"
      [vtsStep]="1"
      [vtsFormatter]="formatterDollar"
      [vtsParser]="parserDollar"
    ></vts-input-number>
    <vts-input-number
      [(ngModel)]="demoValue"
      [vtsMin]="1"
      [vtsMax]="100"
      [vtsStep]="1"
      [vtsFormatter]="formatterPercent"
      [vtsParser]="parserPercent"
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
export class VtsDemoInputNumberFormatterComponent {
  demoValue = 100;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');
}
