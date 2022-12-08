import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-date-picker-switch',
  template: `
    <vts-space>
      <vts-space-item>
        <vts-select [(ngModel)]="mode">
          <vts-option vtsValue="date" vtsLabel="Date"></vts-option>
          <vts-option vtsValue="week" vtsLabel="Week"></vts-option>
          <vts-option vtsValue="month" vtsLabel="Month"></vts-option>
          <vts-option vtsValue="year" vtsLabel="Year"></vts-option>
        </vts-select>
      </vts-space-item>
      <vts-space-item>
        <vts-date-picker [vtsMode]="mode"></vts-date-picker>
      </vts-space-item>
    </vts-space>
  `
})
export class VtsDemoDatePickerSwitchComponent {
  mode = 'date';
}
