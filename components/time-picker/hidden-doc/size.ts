import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-size',
  template: `
    <vts-time-picker [(ngModel)]="time" vtsSize="lg"></vts-time-picker>
    <vts-time-picker [(ngModel)]="time"></vts-time-picker>
    <vts-time-picker [(ngModel)]="time" vtsSize="sm"></vts-time-picker>
  `,
  styles: [
    `
      vts-time-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoTimePickerSizeComponent {
  time = new Date();
}
