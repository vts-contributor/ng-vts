import { Component } from '@angular/core';
import { VtsCalendarMode } from '@ui-vts/ng-vts/calendar';

@Component({
  selector: 'vts-demo-calendar-basic',
  template: `
    <vts-calendar
      [(ngModel)]="date"
      [(vtsMode)]="mode"
      (vtsPanelChange)="panelChange($event)"
    ></vts-calendar>
  `
})
export class VtsDemoCalendarBasicComponent {
  date = new Date(2012, 11, 21);
  mode: VtsCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
