import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'vts-demo-date-picker-range-picker',
  template: `
    <vts-range-picker [(ngModel)]="date" (ngModelChange)="onChange($event)"></vts-range-picker>
    <br />
    <vts-range-picker
      [vtsShowTime]="true"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
    ></vts-range-picker>
    <br />
    <vts-range-picker
      vtsMode="week"
      [(ngModel)]="date"
      (ngModelChange)="getWeek($event)"
    ></vts-range-picker>
    <br />
    <vts-range-picker
      vtsMode="month"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
    ></vts-range-picker>
    <br />
    <vts-range-picker
      vtsMode="year"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
    ></vts-range-picker>
  `,
  styles: [
    `
      vts-range-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerRangePickerComponent {
  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
}
