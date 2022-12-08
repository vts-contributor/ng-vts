import { Component } from '@angular/core';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DisabledTimeFn, DisabledTimePartial } from '@ui-vts/ng-vts/date-picker';

@Component({
  selector: 'vts-demo-date-picker-disabled-date',
  template: `
    <vts-date-picker
      vtsFormat="yyyy-MM-dd HH:mm:ss"
      [vtsDisabledDate]="disabledDate"
      [vtsDisabledTime]="disabledDateTime"
      [vtsShowTime]="{
        vtsDefaultOpenValue: timeDefaultValue
      }"
    ></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="month" [vtsDisabledDate]="disabledDate"></vts-date-picker>
    <br />
    <vts-date-picker vtsMode="year" [vtsDisabledDate]="disabledDate"></vts-date-picker>
    <br />
    <vts-range-picker
      [vtsDisabledDate]="disabledDate"
      [vtsDisabledTime]="disabledRangeTime"
      [vtsShowTime]="{
        vtsHideDisabledOptions: true,
        vtsDefaultOpenValue: timeDefaultValue
      }"
      vtsFormat="yyyy-MM-dd HH:mm:ss"
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
export class VtsDemoDatePickerDisabledDateComponent {
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  disabledDateTime: DisabledTimeFn = () => {
    return {
      vtsDisabledHours: () => this.range(0, 24).splice(4, 20),
      vtsDisabledMinutes: () => this.range(30, 60),
      vtsDisabledSeconds: () => [55, 56]
    };
  };

  disabledRangeTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        vtsDisabledHours: () => this.range(0, 60).splice(4, 20),
        vtsDisabledMinutes: () => this.range(30, 60),
        vtsDisabledSeconds: () => [55, 56]
      };
    }
    return {
      vtsDisabledHours: () => this.range(0, 60).splice(20, 4),
      vtsDisabledMinutes: () => this.range(0, 31),
      vtsDisabledSeconds: () => [55, 56]
    };
  };
}
