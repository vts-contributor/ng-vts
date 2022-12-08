import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-interval-options',
  template: `
    <vts-time-picker [vtsMinuteStep]="15" [vtsSecondStep]="10"></vts-time-picker>
  `
})
export class VtsDemoTimePickerIntervalOptionsComponent {}
