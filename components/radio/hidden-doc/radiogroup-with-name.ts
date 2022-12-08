import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-radiogroup-with-name',
  template: `
    <vts-radio-group [(ngModel)]="radioValue" vtsName="radiogroup">
      <label vts-radio vtsValue="A">A</label>
      <label vts-radio vtsValue="B">B</label>
      <label vts-radio vtsValue="C">C</label>
      <label vts-radio vtsValue="D">D</label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioRadiogroupWithNameComponent {
  radioValue = 'A';
}
