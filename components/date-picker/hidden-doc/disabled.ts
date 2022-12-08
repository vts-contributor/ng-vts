import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-disabled',
  template: `
    <vts-date-picker vtsDisabled></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="month" vtsDisabled></vts-date-picker>
    <br />
    <vts-range-picker vtsDisabled></vts-range-picker>
  `,
  styles: [
    `
      vts-date-picker,
      vts-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerDisabledComponent {}
