/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { DateHelperService, VtsI18nService as I18n } from '@ui-vts/ng-vts/i18n';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-calendar-header',
  exportAs: 'vtsCalendarHeader',
  template: `
    <div class="vts-picker-calendar-header">
      <vts-select
        class="vts-picker-calendar-year-select"
        [vtsSize]="size"
        [vtsDropdownMatchSelectWidth]="false"
        [ngModel]="activeYear"
        (ngModelChange)="updateYear($event)"
      >
        <vts-option
          *ngFor="let year of years"
          [vtsLabel]="year.label"
          [vtsValue]="year.value"
        ></vts-option>
      </vts-select>

      <vts-select
        *ngIf="mode === 'month'"
        class="vts-picker-calendar-month-select"
        [vtsSize]="size"
        [vtsDropdownMatchSelectWidth]="false"
        [ngModel]="activeMonth"
        (ngModelChange)="monthChange.emit($event)"
      >
        <vts-option
          *ngFor="let month of months"
          [vtsLabel]="month.label"
          [vtsValue]="month.value"
        ></vts-option>
      </vts-select>

      <vts-radio-group
        class="vts-picker-calendar-mode-switch"
        [(ngModel)]="mode"
        (ngModelChange)="modeChange.emit($event)"
        [vtsSize]="size"
      >
        <label vts-radio-button vtsValue="month">{{ monthTypeText }}</label>
        <label vts-radio-button vtsValue="year">{{ yearTypeText }}</label>
      </vts-radio-group>
    </div>
  `,
  host: {
    '[style.display]': `'block'`
  }
})
export class VtsCalendarHeaderComponent implements OnInit {
  @Input() mode: 'month' | 'year' = 'month';
  @Input() fullscreen: boolean = true;
  @Input() activeDate: CandyDate = new CandyDate();

  @Output() readonly modeChange: EventEmitter<'month' | 'year'> = new EventEmitter();
  @Output() readonly yearChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly monthChange: EventEmitter<number> = new EventEmitter();
  // @Output() readonly valueChange: EventEmitter<CandyDate> = new EventEmitter();

  yearOffset: number = 10;
  yearTotal: number = 20;
  years: Array<{ label: string; value: number }> = [];
  months: Array<{ label: string; value: number }> = [];

  get activeYear(): number {
    return this.activeDate.getYear();
  }

  get activeMonth(): number {
    return this.activeDate.getMonth();
  }

  get size(): VtsSizeXLMSType {
    return this.fullscreen ? 'md' : 'sm';
  }

  get yearTypeText(): string {
    return this.i18n.getLocale().Calendar.lang.year;
  }

  get monthTypeText(): string {
    return this.i18n.getLocale().Calendar.lang.month;
  }

  constructor(
    private i18n: I18n,
    private dateHelper: DateHelperService,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-fullcalendar-header');
  }

  ngOnInit(): void {
    this.setUpYears();
    this.setUpMonths();
  }

  updateYear(year: number): void {
    this.yearChange.emit(year);
    this.setUpYears(year);
  }

  private setUpYears(year?: number): void {
    const start = (year || this.activeYear) - this.yearOffset;
    const end = start + this.yearTotal;

    this.years = [];
    for (let i = start; i < end; i++) {
      this.years.push({ label: `${i}`, value: i });
    }
  }

  private setUpMonths(): void {
    this.months = [];

    for (let i = 0; i < 12; i++) {
      const dateInMonth = this.activeDate.setMonth(i);
      const monthText = this.dateHelper.format(dateInMonth.nativeDate, 'MMM');
      this.months.push({ label: monthText, value: i });
    }
  }
}
