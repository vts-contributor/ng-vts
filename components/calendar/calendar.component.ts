/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  VtsDateCellDirective as DateCell,
  VtsDateFullCellDirective as DateFullCell,
  VtsMonthCellDirective as MonthCell,
  VtsMonthFullCellDirective as MonthFullCell
} from './calendar-cells';

export type VtsCalendarMode = 'month' | 'year';
type VtsCalendarDateTemplate = TemplateRef<{ $implicit: Date }>;

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-calendar',
  exportAs: 'vtsCalendar',
  template: `
    <vts-calendar-header
      [fullscreen]="vtsFullscreen"
      [activeDate]="activeDate"
      [(mode)]="vtsMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    ></vts-calendar-header>

    <div class="vts-picker-panel">
      <div class="vts-picker-{{ vtsMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="vts-picker-body">
          <ng-container
            *ngIf="vtsMode === 'month'; then monthModeTable; else yearModeTable"
          ></ng-container>
        </div>
      </div>
    </div>
    <ng-template #monthModeTable>
      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
      <date-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(dateCell)"
        [fullCellRender]="$any(dateFullCell)"
        [disabledDate]="vtsDisabledDate"
        (valueChange)="onDateSelect($event)"
      ></date-table>
    </ng-template>

    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
    <ng-template #yearModeTable>
      <month-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(monthCell)"
        [fullCellRender]="$any(monthFullCell)"
        (valueChange)="onDateSelect($event)"
      ></month-table>
    </ng-template>
  `,
  host: {
    '[class.vts-picker-calendar-full]': 'vtsFullscreen',
    '[class.vts-picker-calendar-mini]': '!vtsFullscreen',
    '[class.vts-picker-calendar-rtl]': `dir === 'rtl'`
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsCalendarComponent),
      multi: true
    }
  ]
})
export class VtsCalendarComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_vtsFullscreen: BooleanInput;

  activeDate: CandyDate = new CandyDate();
  prefixCls: string = 'vts-picker-calendar';
  private destroy$ = new Subject<void>();
  dir: Direction = 'ltr';

  private onChangeFn: (date: Date) => void = () => {};
  private onTouchFn: () => void = () => {};

  @Input() vtsMode: VtsCalendarMode = 'month';
  @Input() vtsValue?: Date;
  @Input() vtsDisabledDate?: (date: Date) => boolean;

  @Output()
  readonly vtsModeChange: EventEmitter<VtsCalendarMode> = new EventEmitter();
  @Output() readonly vtsPanelChange: EventEmitter<{
    date: Date;
    mode: VtsCalendarMode;
  }> = new EventEmitter();
  @Output() readonly vtsSelectChange: EventEmitter<Date> = new EventEmitter();
  @Output() readonly vtsValueChange: EventEmitter<Date> = new EventEmitter();

  /**
   * Cannot use @Input and @ContentChild on one variable
   * because { static: false } will make @Input property get delayed
   **/
  @Input() vtsDateCell?: VtsCalendarDateTemplate;
  @ContentChild(DateCell, { static: false, read: TemplateRef })
  vtsDateCellChild?: VtsCalendarDateTemplate;
  get dateCell(): VtsCalendarDateTemplate {
    return (this.vtsDateCell || this.vtsDateCellChild)!;
  }

  @Input() vtsDateFullCell?: VtsCalendarDateTemplate;
  @ContentChild(DateFullCell, { static: false, read: TemplateRef })
  vtsDateFullCellChild?: VtsCalendarDateTemplate;
  get dateFullCell(): VtsCalendarDateTemplate {
    return (this.vtsDateFullCell || this.vtsDateFullCellChild)!;
  }

  @Input() vtsMonthCell?: VtsCalendarDateTemplate;
  @ContentChild(MonthCell, { static: false, read: TemplateRef })
  vtsMonthCellChild?: VtsCalendarDateTemplate;
  get monthCell(): VtsCalendarDateTemplate {
    return (this.vtsMonthCell || this.vtsMonthCellChild)!;
  }

  @Input() vtsMonthFullCell?: VtsCalendarDateTemplate;
  @ContentChild(MonthFullCell, { static: false, read: TemplateRef })
  vtsMonthFullCellChild?: VtsCalendarDateTemplate;
  get monthFullCell(): VtsCalendarDateTemplate {
    return (this.vtsMonthFullCell || this.vtsMonthFullCellChild)!;
  }

  @Input() @InputBoolean() vtsFullscreen: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-picker-calendar');
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = this.directionality.value;
    });
  }

  onModeChange(mode: VtsCalendarMode): void {
    this.vtsModeChange.emit(mode);
    this.vtsPanelChange.emit({ date: this.activeDate.nativeDate, mode });
  }

  onYearSelect(year: number): void {
    const date = this.activeDate.setYear(year);
    this.updateDate(date);
  }

  onMonthSelect(month: number): void {
    const date = this.activeDate.setMonth(month);
    this.updateDate(date);
  }

  onDateSelect(date: CandyDate): void {
    // Only activeDate is enough in calendar
    // this.value = date;
    this.updateDate(date);
  }

  writeValue(value: Date | null): void {
    this.updateDate(new CandyDate(value as Date), false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchFn = fn;
  }

  private updateDate(date: CandyDate, touched: boolean = true): void {
    this.activeDate = date;

    if (touched) {
      this.onChangeFn(date.nativeDate);
      this.onTouchFn();
      this.vtsSelectChange.emit(date.nativeDate);
      this.vtsValueChange.emit(date.nativeDate);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsValue) {
      this.updateDate(new CandyDate(this.vtsValue), false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
