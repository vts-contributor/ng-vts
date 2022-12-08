import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-group',
  template: `
    <vts-checkbox-group
      [(ngModel)]="checkOptionsOne"
      (ngModelChange)="log(checkOptionsOne)"
    ></vts-checkbox-group>
    <br />
    <br />
    <vts-checkbox-group
      [(ngModel)]="checkOptionsTwo"
      (ngModelChange)="log(checkOptionsTwo)"
    ></vts-checkbox-group>
    <br />
    <br />
    <vts-checkbox-group
      [(ngModel)]="checkOptionsThree"
      (ngModelChange)="log(checkOptionsThree)"
    ></vts-checkbox-group>
  `
})
export class VtsDemoCheckboxGroupComponent {
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  checkOptionsTwo = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear', checked: true },
    { label: 'Orange', value: 'Orange' }
  ];
  checkOptionsThree = [
    { label: 'Apple', value: 'Apple', disabled: true, checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' }
  ];

  log(value: object[]): void {
    console.log(value);
  }
}
