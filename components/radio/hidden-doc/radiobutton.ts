import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-radiobutton',
  template: `
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B">Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B" vtsDisabled>Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio-button vtsValue="A" vtsDisabled>Hangzhou</label>
      <label vts-radio-button vtsValue="B" vtsDisabled>Shanghai</label>
      <label vts-radio-button vtsValue="C" vtsDisabled>Beijing</label>
      <label vts-radio-button vtsValue="D" vtsDisabled>Chengdu</label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioRadiobuttonComponent {
  radioValue = 'A';
}
