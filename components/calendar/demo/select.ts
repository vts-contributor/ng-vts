import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-calendar-select',
  template: `
    <vts-alert
      vtsMessage="Your selected date: {{ selectedValue | date : 'yyyy-MM-dd' }}"
    ></vts-alert>
    <vts-calendar
      [(ngModel)]="selectedValue"
      (vtsSelectChange)="selectChange($event)"
    ></vts-calendar>
  `
})
export class VtsDemoCalendarSelectComponent {
  selectedValue = new Date('2017-01-25');

  selectChange(select: Date): void {
    console.log(`Select value: ${select}`);
  }
}
