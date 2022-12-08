import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-radiogroup-more',
  template: `
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio vtsValue="A">Option A</label>
      <label vts-radio vtsValue="B">Option B</label>
      <label vts-radio vtsValue="C">Option C</label>
      <label vts-radio vtsValue="M">
        More...
        <input type="text" vts-input *ngIf="radioValue === 'M'" />
      </label>
    </vts-radio-group>
  `,
  styles: [
    `
      [vts-radio] {
        display: block;
        height: 32px;
        line-height: 32px;
      }
      input {
        width: 100px;
        margin-left: 10px;
      }
    `
  ]
})
export class VtsDemoRadioRadiogroupMoreComponent {
  radioValue = 'A';
}
