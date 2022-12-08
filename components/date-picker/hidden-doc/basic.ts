import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { en_US, VtsI18nService, zh_CN } from '@ui-vts/ng-vts/i18n';

@Component({
  selector: 'vts-demo-date-picker-basic',
  template: `
    <vts-date-picker [(ngModel)]="date" (ngModelChange)="onChange($event)"></vts-date-picker>
    <br />
    <vts-date-picker
      vtsMode="week"
      [(ngModel)]="date"
      (ngModelChange)="getWeek($event)"
    ></vts-date-picker>
    <br />
    <vts-date-picker
      vtsMode="month"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
    ></vts-date-picker>
    <br />
    <vts-date-picker
      vtsMode="year"
      [(ngModel)]="date"
      (ngModelChange)="onChange($event)"
    ></vts-date-picker>
    <br />
    <button vts-button vtsType="default" (click)="changeLanguage()">
      Switch language for all pickers
    </button>
  `,
  styles: [
    `
      vts-date-picker {
        margin: 0 8px 12px 0;
      }
    `
  ]
})
export class VtsDemoDatePickerBasicComponent {
  date = null;
  isEnglish = false;

  constructor(private i18n: VtsI18nService) {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
