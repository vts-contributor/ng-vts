import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-calendar-card',
  template: `
    <div
      [ngStyle]="{
        width: '300px',
        border: '1px solid #d9d9d9',
        borderRadius: '4px'
      }"
    >
      <vts-calendar
        [vtsFullscreen]="false"
        (vtsSelectChange)="onValueChange($event)"
        (vtsPanelChange)="onPanelChange($event)"
      ></vts-calendar>
    </div>
  `
})
export class VtsDemoCalendarCardComponent {
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }
}
