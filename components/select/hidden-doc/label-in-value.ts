import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-label-in-value',
  template: `
    <p>The selected option's age is {{ selectedValue?.age }}</p>
    <br />
    <vts-select
      [(ngModel)]="selectedValue"
      [vtsCustomCompareFn]="vtsCustomCompareFn"
      (ngModelChange)="log($event)"
      vtsAllowClear
      vtsPlaceHolder="Choose"
    >
      <vts-option
        *ngFor="let option of optionList"
        [vtsValue]="option"
        [vtsLabel]="option.label"
      ></vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 120px;
      }
    `
  ]
})
export class VtsDemoSelectLabelInValueComponent {
  optionList = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];
  selectedValue = { label: 'Jack', value: 'jack', age: 22 };
  // tslint:disable-next-line:no-any
  vtsCustomCompareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: { label: string; value: string; age: number }): void {
    console.log(value);
  }
}
