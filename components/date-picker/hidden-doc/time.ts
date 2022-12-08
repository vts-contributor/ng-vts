import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-time',
  template: `
    <vts-date-picker
      vtsShowTime
      vtsFormat="yyyy-MM-dd HH:mm:ss"
      ngModel
      (ngModelChange)="onChange($event)"
      (vtsOnOk)="onOk($event)"
    ></vts-date-picker>
    <br />
    <vts-range-picker
      [vtsShowTime]="{ vtsFormat: 'HH:mm' }"
      vtsFormat="yyyy-MM-dd HH:mm"
      ngModel
      (ngModelChange)="onChange($event)"
      (vtsOnCalendarChange)="onCalendarChange($event)"
      (vtsOnOk)="onOk($event)"
    ></vts-range-picker>
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
export class VtsDemoDatePickerTimeComponent {
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }
}
