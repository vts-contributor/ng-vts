import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-basic',
  template: `
    <form [vtsLayout]="'horizontal'" vts-form>
      <vts-form-item>
        <vts-form-label>No Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio1" [(ngModel)]="radioValue">
            <label vts-radio vtsValue="A"></label>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Plus Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio2" [(ngModel)]="radioValue">
            <label vts-radio vtsValue="A">Radio button item</label>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoRadioBasicComponent {
  radioValue: string = '';
}
