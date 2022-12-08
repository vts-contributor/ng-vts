import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-value',
  template: `
    <vts-time-picker [(ngModel)]="time" (ngModelChange)="log($event)"></vts-time-picker>
  `
})
export class VtsDemoTimePickerValueComponent {
  time: Date | null = null;

  log(time: Date): void {
    console.log(time && time.toTimeString());
  }
}
