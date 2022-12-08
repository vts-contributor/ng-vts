import { Component } from '@angular/core';
import { endOfMonth } from 'date-fns';

@Component({
  selector: 'vts-demo-date-picker-presetted-ranges',
  template: `
    <vts-range-picker
      [vtsRanges]="ranges"
      ngModel
      (ngModelChange)="onChange($event)"
    ></vts-range-picker>
    <br />
    <vts-range-picker
      [vtsRanges]="ranges"
      vtsShowTime
      vtsFormat="yyyy/MM/dd HH:mm:ss"
      ngModel
      (ngModelChange)="onChange($event)"
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
export class VtsDemoDatePickerPresettedRangesComponent {
  ranges = {
    Today: [new Date(), new Date()],
    'This Month': [new Date(), endOfMonth(new Date())]
  };

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
  }
}
