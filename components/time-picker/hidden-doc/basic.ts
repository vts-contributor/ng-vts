import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-basic',
  template: `
    <vts-time-picker [(ngModel)]="time" [vtsDefaultOpenValue]="defaultOpenValue"></vts-time-picker>
  `
})
export class VtsDemoTimePickerBasicComponent {
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
}
