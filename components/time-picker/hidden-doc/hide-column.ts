import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-hide-column',
  template: `
    <vts-time-picker [(ngModel)]="time" vtsFormat="HH:mm"></vts-time-picker>
  `
})
export class VtsDemoTimePickerHideColumnComponent {
  time = new Date();
}
