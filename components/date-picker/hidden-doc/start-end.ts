import { Component, ViewChild } from '@angular/core';
import { VtsDatePickerComponent } from '@ui-vts/ng-vts/date-picker';

@Component({
  selector: 'vts-demo-date-picker-start-end',
  template: `
    <vts-date-picker
      [vtsDisabledDate]="disabledStartDate"
      vtsShowTime
      vtsFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="startValue"
      vtsPlaceHolder="Start"
      (vtsOpenChange)="handleStartOpenChange($event)"
    ></vts-date-picker>
    <vts-date-picker
      #endDatePicker
      [vtsDisabledDate]="disabledEndDate"
      vtsShowTime
      vtsFormat="yyyy-MM-dd HH:mm:ss"
      [(ngModel)]="endValue"
      vtsPlaceHolder="End"
      (vtsOpenChange)="handleEndOpenChange($event)"
    ></vts-date-picker>
  `,
  styles: [
    `
      vts-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerStartEndComponent {
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: VtsDatePickerComponent;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }
}
