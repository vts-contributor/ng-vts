import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-use12-hours',
  template: `
    <vts-time-picker
      [(ngModel)]="time"
      [vtsUse12Hours]="true"
      (ngModelChange)="log($event)"
    ></vts-time-picker>
    <vts-time-picker
      [(ngModel)]="time"
      [vtsUse12Hours]="true"
      (ngModelChange)="log($event)"
      vtsFormat="h:mm a"
    ></vts-time-picker>
  `,
  styles: [
    `
      vts-time-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoTimePickerUse12HoursComponent {
  time: Date | null = null;

  log(value: Date): void {
    console.log(value);
  }
}
