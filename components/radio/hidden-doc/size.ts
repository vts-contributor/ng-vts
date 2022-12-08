import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-size',
  template: `
    <vts-radio-group [(ngModel)]="radioValue" vtsSize="lg">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B">Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-radio-group [(ngModel)]="radioValue">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B">Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
    <br />
    <br />
    <vts-radio-group [(ngModel)]="radioValue" vtsSize="sm">
      <label vts-radio-button vtsValue="A">Hangzhou</label>
      <label vts-radio-button vtsValue="B">Shanghai</label>
      <label vts-radio-button vtsValue="C">Beijing</label>
      <label vts-radio-button vtsValue="D">Chengdu</label>
    </vts-radio-group>
  `
})
export class VtsDemoRadioSizeComponent {
  radioValue = 'A';
}
