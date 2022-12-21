/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DebugElement,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { reqAnimFrame } from '@ui-vts/ng-vts/core/polyfill';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';

import { InputBoolean, isNotNil } from '@ui-vts/ng-vts/core/util';
import { DateHelperService } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeHolder } from './time-holder';

function makeRange(length: number, step: number = 1, start: number = 0): number[] {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}

export type VtsTimePickerUnit = 'hour' | 'minute' | 'second' | '12-hour';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-time-picker-panel',
  exportAs: 'vtsTimePickerPanel',
  template: `
    <div *ngIf="vtsInDatePicker" class="vts-picker-header">
      <div class="vts-picker-header-view">
        {{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}
      </div>
    </div>
    <div class="vts-picker-content">
      <ul
        *ngIf="hourEnabled"
        #hourListElement
        class="vts-picker-time-panel-column"
        style="position: relative;"
      >
        <ng-container *ngFor="let hour of hourRange; trackBy: trackByFn">
          <li
            *ngIf="!(vtsHideDisabledOptions && hour.disabled)"
            class="vts-picker-time-panel-cell"
            (click)="selectHour(hour)"
            [class.vts-picker-time-panel-cell-selected]="isSelectedHour(hour)"
            [class.vts-picker-time-panel-cell-disabled]="hour.disabled"
          >
            <div class="vts-picker-time-panel-cell-inner">
              {{ hour.index | number : '2.0-0' }}
            </div>
          </li>
        </ng-container>
      </ul>
      <ul
        *ngIf="minuteEnabled"
        #minuteListElement
        class="vts-picker-time-panel-column"
        style="position: relative;"
      >
        <ng-container *ngFor="let minute of minuteRange; trackBy: trackByFn">
          <li
            *ngIf="!(vtsHideDisabledOptions && minute.disabled)"
            class="vts-picker-time-panel-cell"
            (click)="selectMinute(minute)"
            [class.vts-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
            [class.vts-picker-time-panel-cell-disabled]="minute.disabled"
          >
            <div class="vts-picker-time-panel-cell-inner">
              {{ minute.index | number : '2.0-0' }}
            </div>
          </li>
        </ng-container>
      </ul>
      <ul
        *ngIf="secondEnabled"
        #secondListElement
        class="vts-picker-time-panel-column"
        style="position: relative;"
      >
        <ng-container *ngFor="let second of secondRange; trackBy: trackByFn">
          <li
            *ngIf="!(vtsHideDisabledOptions && second.disabled)"
            class="vts-picker-time-panel-cell"
            (click)="selectSecond(second)"
            [class.vts-picker-time-panel-cell-selected]="isSelectedSecond(second)"
            [class.vts-picker-time-panel-cell-disabled]="second.disabled"
          >
            <div class="vts-picker-time-panel-cell-inner">
              {{ second.index | number : '2.0-0' }}
            </div>
          </li>
        </ng-container>
      </ul>
      <ul
        *ngIf="vtsUse12Hours"
        #use12HoursListElement
        class="vts-picker-time-panel-column"
        style="position: relative;"
      >
        <ng-container *ngFor="let range of use12HoursRange">
          <li
            *ngIf="!vtsHideDisabledOptions"
            (click)="select12Hours(range)"
            class="vts-picker-time-panel-cell"
            [class.vts-picker-time-panel-cell-selected]="isSelected12Hours(range)"
          >
            <div class="vts-picker-time-panel-cell-inner">
              {{ range.value }}
            </div>
          </li>
        </ng-container>
      </ul>
    </div>
    <div *ngIf="!vtsInDatePicker" class="vts-picker-footer">
      <div *ngIf="vtsAddOn" class="vts-picker-footer-extra">
        <ng-template [ngTemplateOutlet]="vtsAddOn"></ng-template>
      </div>
      <ul class="vts-picker-ranges">
        <li *ngIf="!!vtsNowText" class="vts-picker-now">
          <a (click)="onClickNow()">
            {{ vtsNowText }}
          </a>
        </li>
        <li class="vts-picker-ok">
          <button vts-button type="button" vtsSize="sm" vtsType="primary" (click)="onClickOk()">
            {{ vtsOkText || ('Calendar.lang.ok' | vtsI18n) }}
          </button>
        </li>
      </ul>
    </div>
  `,
  host: {
    '[class.vts-picker-time-panel-column-0]': `enabledColumns === 0 && !vtsInDatePicker`,
    '[class.vts-picker-time-panel-column-1]': `enabledColumns === 1 && !vtsInDatePicker`,
    '[class.vts-picker-time-panel-column-2]': `enabledColumns === 2 && !vtsInDatePicker`,
    '[class.vts-picker-time-panel-column-3]': `enabledColumns === 3 && !vtsInDatePicker`,
    '[class.vts-picker-time-panel-narrow]': `enabledColumns < 3`,
    '[class.vts-picker-time-panel-placement-bottomLeft]': `!vtsInDatePicker`,
    '(mousedown)': 'onMousedown($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: VtsTimePickerPanelComponent,
      multi: true
    }
  ]
})
export class VtsTimePickerPanelComponent
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges
{
  static ngAcceptInputType_vtsUse12Hours: BooleanInput;

  private _vtsHourStep = 1;
  private _vtsMinuteStep = 1;
  private _vtsSecondStep = 1;
  private unsubscribe$ = new Subject<void>();
  private onChange?: (value: Date) => void;
  private onTouch?: () => void;
  private _format = 'HH:mm:ss';
  private _disabledHours?: () => number[] = () => [];
  private _disabledMinutes?: (hour: number) => number[] = () => [];
  private _disabledSeconds?: (hour: number, minute: number) => number[] = () => [];
  private _allowEmpty = true;
  time = new TimeHolder();
  hourEnabled = true;
  minuteEnabled = true;
  secondEnabled = true;
  firstScrolled = false;
  enabledColumns = 3;
  hourRange!: ReadonlyArray<{ index: number; disabled: boolean }>;
  minuteRange!: ReadonlyArray<{ index: number; disabled: boolean }>;
  secondRange!: ReadonlyArray<{ index: number; disabled: boolean }>;
  use12HoursRange!: ReadonlyArray<{ index: number; value: string }>;

  @ViewChild('hourListElement', { static: false })
  hourListElement?: DebugElement;
  @ViewChild('minuteListElement', { static: false })
  minuteListElement?: DebugElement;
  @ViewChild('secondListElement', { static: false })
  secondListElement?: DebugElement;
  @ViewChild('use12HoursListElement', { static: false })
  use12HoursListElement?: DebugElement;

  @Input() vtsInDatePicker: boolean = false; // If inside a date-picker, more diff works need to be done
  @Input() vtsAddOn?: TemplateRef<void>;
  @Input() vtsHideDisabledOptions = false;
  @Input() vtsClearText?: string;
  @Input() vtsNowText?: string;
  @Input() vtsOkText?: string;
  @Input() vtsPlaceHolder?: string | null;
  @Input() @InputBoolean() vtsUse12Hours = false;
  @Input() vtsDefaultOpenValue?: Date;

  @Output() readonly closePanel = new EventEmitter<void>();

  @Input()
  set vtsAllowEmpty(value: boolean) {
    if (isNotNil(value)) {
      this._allowEmpty = value;
    }
  }

  get vtsAllowEmpty(): boolean {
    return this._allowEmpty;
  }

  @Input()
  set vtsDisabledHours(value: undefined | (() => number[])) {
    this._disabledHours = value;
    if (!!this._disabledHours) {
      this.buildHours();
    }
  }

  get vtsDisabledHours(): undefined | (() => number[]) {
    return this._disabledHours;
  }

  @Input()
  set vtsDisabledMinutes(value: undefined | ((hour: number) => number[])) {
    if (isNotNil(value)) {
      this._disabledMinutes = value;
      this.buildMinutes();
    }
  }

  get vtsDisabledMinutes(): undefined | ((hour: number) => number[]) {
    return this._disabledMinutes;
  }

  @Input()
  set vtsDisabledSeconds(value: undefined | ((hour: number, minute: number) => number[])) {
    if (isNotNil(value)) {
      this._disabledSeconds = value;
      this.buildSeconds();
    }
  }

  get vtsDisabledSeconds(): undefined | ((hour: number, minute: number) => number[]) {
    return this._disabledSeconds;
  }

  @Input()
  set format(value: string) {
    if (isNotNil(value)) {
      this._format = value;
      this.enabledColumns = 0;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has('H') || charSet.has('h');
      this.minuteEnabled = charSet.has('m');
      this.secondEnabled = charSet.has('s');
      if (this.hourEnabled) {
        this.enabledColumns++;
      }
      if (this.minuteEnabled) {
        this.enabledColumns++;
      }
      if (this.secondEnabled) {
        this.enabledColumns++;
      }
      if (this.vtsUse12Hours) {
        this.build12Hours();
      }
    }
  }

  get format(): string {
    return this._format;
  }

  @Input()
  set vtsHourStep(value: number) {
    if (isNotNil(value)) {
      this._vtsHourStep = value;
      this.buildHours();
    }
  }

  get vtsHourStep(): number {
    return this._vtsHourStep;
  }

  @Input()
  set vtsMinuteStep(value: number) {
    if (isNotNil(value)) {
      this._vtsMinuteStep = value;
      this.buildMinutes();
    }
  }

  get vtsMinuteStep(): number {
    return this._vtsMinuteStep;
  }

  @Input()
  set vtsSecondStep(value: number) {
    if (isNotNil(value)) {
      this._vtsSecondStep = value;
      this.buildSeconds();
    }
  }

  get vtsSecondStep(): number {
    return this._vtsSecondStep;
  }

  trackByFn(index: number): number {
    return index;
  }

  buildHours(): void {
    let hourRanges = 24;
    let disabledHours = this.vtsDisabledHours?.();
    let startIndex = 0;
    if (this.vtsUse12Hours) {
      hourRanges = 12;
      if (disabledHours) {
        if (this.time.selected12Hours === 'PM') {
          /**
           * Filter and transform hours which greater or equal to 12
           * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
           */
          disabledHours = disabledHours.filter(i => i >= 12).map(i => (i > 12 ? i - 12 : i));
        } else {
          /**
           * Filter and transform hours which less than 12
           * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
           */
          disabledHours = disabledHours
            .filter(i => i < 12 || i === 24)
            .map(i => (i === 24 || i === 0 ? 12 : i));
        }
      }
      startIndex = 1;
    }
    this.hourRange = makeRange(hourRanges, this.vtsHourStep, startIndex).map(r => {
      return {
        index: r,
        disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
      };
    });
    if (this.vtsUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
      const temp = [...this.hourRange];
      temp.unshift(temp[temp.length - 1]);
      temp.splice(temp.length - 1, 1);
      this.hourRange = temp;
    }
  }

  buildMinutes(): void {
    this.minuteRange = makeRange(60, this.vtsMinuteStep).map(r => {
      return {
        index: r,
        disabled:
          !!this.vtsDisabledMinutes && this.vtsDisabledMinutes(this.time.hours!).indexOf(r) !== -1
      };
    });
  }

  buildSeconds(): void {
    this.secondRange = makeRange(60, this.vtsSecondStep).map(r => {
      return {
        index: r,
        disabled:
          !!this.vtsDisabledSeconds &&
          this.vtsDisabledSeconds(this.time.hours!, this.time.minutes!).indexOf(r) !== -1
      };
    });
  }

  build12Hours(): void {
    const isUpperFormat = this._format.includes('A');
    this.use12HoursRange = [
      {
        index: 0,
        value: isUpperFormat ? 'AM' : 'am'
      },
      {
        index: 1,
        value: isUpperFormat ? 'PM' : 'pm'
      }
    ];
  }

  buildTimes(): void {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
    this.build12Hours();
  }

  scrollToTime(delay: number = 0): void {
    if (this.hourEnabled && this.hourListElement) {
      this.scrollToSelected(
        this.hourListElement.nativeElement,
        this.time.viewHours!,
        delay,
        'hour'
      );
    }
    if (this.minuteEnabled && this.minuteListElement) {
      this.scrollToSelected(
        this.minuteListElement.nativeElement,
        this.time.minutes!,
        delay,
        'minute'
      );
    }
    if (this.secondEnabled && this.secondListElement) {
      this.scrollToSelected(
        this.secondListElement.nativeElement,
        this.time.seconds!,
        delay,
        'second'
      );
    }
    if (this.vtsUse12Hours && this.use12HoursListElement) {
      const selectedHours = this.time.selected12Hours;
      const index = selectedHours === 'AM' ? 0 : 1;
      this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, '12-hour');
    }
  }

  selectHour(hour: { index: number; disabled: boolean }): void {
    if (this.time.value) {
      this.time.setHours(hour.index, hour.disabled);
    } else {
      this.time.setHours(hour.index, hour.disabled);
      this.time.setMinutes(0, false);
      this.time.setSeconds(0, false);
    }
    if (!!this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }

  selectMinute(minute: { index: number; disabled: boolean }): void {
    this.time.setMinutes(minute.index, minute.disabled);
    if (!!this._disabledSeconds) {
      this.buildSeconds();
    }
  }

  selectSecond(second: { index: number; disabled: boolean }): void {
    this.time.setSeconds(second.index, second.disabled);
  }

  select12Hours(value: { index: number; value: string }): void {
    this.time.setSelected12Hours(value.value);
    if (!!this._disabledHours) {
      this.buildHours();
    }
    if (!!this._disabledMinutes) {
      this.buildMinutes();
    }
    if (!!this._disabledSeconds) {
      this.buildSeconds();
    }
  }

  scrollToSelected(
    instance: HTMLElement,
    index: number,
    duration: number = 0,
    unit: VtsTimePickerUnit
  ): void {
    if (!instance) {
      return;
    }
    const transIndex = this.translateIndex(index, unit);
    const currentOption = (instance.children[transIndex] || instance.children[0]) as HTMLElement;
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }

  translateIndex(index: number, unit: VtsTimePickerUnit): number {
    if (unit === 'hour') {
      return this.calcIndex(
        this.vtsDisabledHours?.(),
        this.hourRange.map(item => item.index).indexOf(index)
      );
    } else if (unit === 'minute') {
      return this.calcIndex(
        this.vtsDisabledMinutes?.(this.time.hours!),
        this.minuteRange.map(item => item.index).indexOf(index)
      );
    } else if (unit === 'second') {
      // second
      return this.calcIndex(
        this.vtsDisabledSeconds?.(this.time.hours!, this.time.minutes!),
        this.secondRange.map(item => item.index).indexOf(index)
      );
    } else {
      // 12-hour
      return this.calcIndex([], this.use12HoursRange.map(item => item.index).indexOf(index));
    }
  }

  scrollTo(element: HTMLElement, to: number, duration: number): void {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    reqAnimFrame(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      this.scrollTo(element, to, duration - 10);
    });
  }

  calcIndex(array: number[] | undefined, index: number): number {
    if (array?.length && this.vtsHideDisabledOptions) {
      return (
        index -
        array.reduce((pre, value) => {
          return pre + (value < index ? 1 : 0);
        }, 0)
      );
    } else {
      return index;
    }
  }

  protected changed(): void {
    if (this.onChange) {
      this.onChange(this.time.value!);
    }
  }

  protected touched(): void {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  timeDisabled(value: Date): boolean {
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    return (
      (this.vtsDisabledHours?.().indexOf(hour) ?? -1) > -1 ||
      (this.vtsDisabledMinutes?.(hour).indexOf(minute) ?? -1) > -1 ||
      (this.vtsDisabledSeconds?.(hour, minute).indexOf(second) ?? -1) > -1
    );
  }

  onClickNow(): void {
    const now = new Date();
    if (this.timeDisabled(now)) {
      return;
    }
    this.time.setValue(now);
    this.changed();
    this.closePanel.emit();
  }

  onClickOk(): void {
    this.time.setValue(this.time.value, this.vtsUse12Hours);
    this.changed();
    this.closePanel.emit();
  }

  isSelectedHour(hour: { index: number; disabled: boolean }): boolean {
    return hour.index === this.time.viewHours;
  }

  isSelectedMinute(minute: { index: number; disabled: boolean }): boolean {
    return minute.index === this.time.minutes;
  }

  isSelectedSecond(second: { index: number; disabled: boolean }): boolean {
    return second.index === this.time.seconds;
  }

  isSelected12Hours(value: { index: number; value: string }): boolean {
    return value.value.toUpperCase() === this.time.selected12Hours;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    public dateHelper: DateHelperService,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-picker-time-panel');
  }

  ngOnInit(): void {
    this.time.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.changed();
      this.touched();
      this.scrollToTime(120);
    });
    this.buildTimes();
    setTimeout(() => {
      this.scrollToTime();
      this.firstScrolled = true;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsUse12Hours, vtsDefaultOpenValue } = changes;
    if (!vtsUse12Hours?.previousValue && vtsUse12Hours?.currentValue) {
      this.build12Hours();
      this.enabledColumns++;
    }
    if (vtsDefaultOpenValue?.currentValue) {
      this.time.setDefaultOpenValue(this.vtsDefaultOpenValue || new Date());
    }
  }

  writeValue(value: Date): void {
    this.time.setValue(value, this.vtsUse12Hours);
    this.buildTimes();

    if (value && this.firstScrolled) {
      this.scrollToTime(120);
    }
    // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  /**
   * Prevent input losing focus when click panel
   * @param event
   */
  onMousedown(event: MouseEvent): void {
    event.preventDefault();
  }
}
