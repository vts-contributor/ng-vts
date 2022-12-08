import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-format',
  template: `
    <vts-date-picker [vtsFormat]="dateFormat"></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="month" [vtsFormat]="monthFormat"></vts-date-picker>
    <br />
    <vts-range-picker [vtsFormat]="dateFormat"></vts-range-picker>
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
export class VtsDemoDatePickerFormatComponent {
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
}
