import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-options',
  template: `
    <vts-select ngModel="lucy" [vtsOptions]="listOfOption"></vts-select>
    <vts-select
      [(ngModel)]="selectedValue"
      vtsAllowClear
      vtsPlaceHolder="Choose"
      [vtsOptions]="listOfGroupOption"
    ></vts-select>
  `,
  styles: [
    `
      vts-select {
        margin: 0 8px 10px 0;
        width: 120px;
      }
    `
  ]
})
export class VtsDemoSelectOptionsComponent {
  selectedValue = 'lucy';
  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];
  listOfGroupOption = [
    { label: 'Jack', value: 'jack', groupLabel: 'Manager' },
    { label: 'Lucy', value: 'lucy', groupLabel: 'Manager' },
    { label: 'Tom', value: 'tom', groupLabel: 'Engineer' }
  ];
}
