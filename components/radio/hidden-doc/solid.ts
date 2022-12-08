import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-solid',
  template: `
    <vts-radio-group [(ngModel)]="radioValue" vtsButtonStyle="solid">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B">Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioSolidComponent {
  radioValue = 'A';
}
