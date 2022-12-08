import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';

@Component({
  selector: 'vts-demo-date-picker-inline',
  template: `
    <vts-tabset>
      <vts-tab vtsTitle="Default">
        <vts-date-picker
          vtsInline
          [(ngModel)]="date"
          (ngModelChange)="onChange($event)"
        ></vts-date-picker>
      </vts-tab>
      <vts-tab vtsTitle="Week">
        <vts-date-picker
          vtsInline
          vtsMode="week"
          [(ngModel)]="date"
          (ngModelChange)="getWeek($event)"
        ></vts-date-picker>
      </vts-tab>
      <vts-tab vtsTitle="Month">
        <vts-date-picker
          vtsInline
          vtsMode="month"
          [(ngModel)]="date"
          (ngModelChange)="onChange($event)"
        ></vts-date-picker>
      </vts-tab>
      <vts-tab vtsTitle="Year">
        <vts-date-picker
          vtsInline
          vtsMode="year"
          [(ngModel)]="date"
          (ngModelChange)="onChange($event)"
        ></vts-date-picker>
      </vts-tab>
      <vts-tab vtsTitle="Range">
        <vts-range-picker
          vtsInline
          [(ngModel)]="rangeDate"
          (ngModelChange)="onChange($event)"
        ></vts-range-picker>
      </vts-tab>
      <vts-tab vtsTitle="Range Time">
        <vts-range-picker
          vtsInline
          vtsShowTime
          [(ngModel)]="rangeDate"
          (ngModelChange)="onChange($event)"
        ></vts-range-picker>
      </vts-tab>
      <vts-tab vtsTitle="Range Week">
        <vts-range-picker
          vtsInline
          vtsMode="week"
          [(ngModel)]="rangeDate"
          (ngModelChange)="onChange($event)"
        ></vts-range-picker>
      </vts-tab>
      <vts-tab vtsTitle="Range Month">
        <vts-range-picker
          vtsInline
          vtsMode="month"
          [(ngModel)]="rangeDate"
          (ngModelChange)="onChange($event)"
        ></vts-range-picker>
      </vts-tab>
      <vts-tab vtsTitle="Range Year">
        <vts-range-picker
          vtsInline
          vtsMode="year"
          [(ngModel)]="rangeDate"
          (ngModelChange)="onChange($event)"
        ></vts-range-picker>
      </vts-tab>
    </vts-tabset>
  `,
  styles: [
    `
      :host ::ng-deep .vts-tabs-tabpane {
        padding: 24px;
        overflow: auto;
      }
    `
  ]
})
export class VtsDemoDatePickerInlineComponent {
  date = null;
  rangeDate = null;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
}
