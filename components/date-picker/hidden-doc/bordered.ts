import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-bordered',
  template: `
    <vts-date-picker vtsBorderless></vts-date-picker>
    <br />
    <vts-range-picker vtsBorderless></vts-range-picker>
    <br />
  `,
  styles: [
    `
      vts-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerBorderedComponent {}
