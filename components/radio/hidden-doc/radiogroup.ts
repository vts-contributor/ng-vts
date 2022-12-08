import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-radiogroup',
  template: `
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio vtsValue="A">A</label>
      <label vts-radio vtsValue="B">B</label>
      <label vts-radio vtsValue="C">C</label>
      <label vts-radio vtsValue="D">D</label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioRadiogroupComponent {
  radioValue = 'A';
}
