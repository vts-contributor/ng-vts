import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-disabled-part',
  template: `
    <vts-time-picker
      [vtsDisabledHours]="disabledHours"
      [vtsDisabledMinutes]="disabledMinutes"
      [vtsDisabledSeconds]="disabledSeconds"
    ></vts-time-picker>
  `
})
export class VtsDemoTimePickerDisabledPartComponent {
  disabledHours(): number[] {
    return [1, 2, 3];
  }

  disabledMinutes(hour: number): number[] {
    if (hour === 4) {
      return [20, 21, 22, 23, 24, 25];
    } else {
      return [];
    }
  }

  disabledSeconds(hour: number, minute: number): number[] {
    if (hour === 5 && minute === 1) {
      return [20, 21, 22, 23, 24, 25];
    } else {
      return [];
    }
  }
}
