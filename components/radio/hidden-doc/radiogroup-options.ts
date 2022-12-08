import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-radiogroup-options',
  template: `
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio [vtsValue]="o.value" *ngFor="let o of options">
        {{ o.label }}
      </label>
    </vts-radio-group>
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio [vtsValue]="o.value" *ngFor="let o of options">
        {{ o.label }}
      </label>
    </vts-radio-group>
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio [vtsValue]="o.value" *ngFor="let o of options">
        {{ o.label }}
      </label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioRadiogroupOptionsComponent {
  radioValue = 'Apple';
  options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
}
