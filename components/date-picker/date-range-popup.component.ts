/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Direction } from '@angular/cdk/bidi';
import {
  CandyDate,
  cloneDate,
  CompatibleValue,
  NormalizedMode,
  SingleValue,
  wrongSortOrder
} from '@ui-vts/ng-vts/core/time';
import { FunctionProp } from '@ui-vts/ng-vts/core/types';
import { VtsCalendarI18nInterface } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import {
  CompatibleDate,
  DisabledDateFn,
  DisabledTimeFn,
  DisabledTimePartial,
  VtsDateMode,
  PresetRanges,
  RangePartType,
  SupportTimeOptions
} from './standard-types';
import { getTimeConfig, isAllowedDate, PREFIX_CLASS } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'date-range-popup',
  exportAs: 'dateRangePopup',
  template: `
    <ng-container *ngIf="isRange; else singlePanel">
      <div *ngIf="opened" class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div
          class="{{ prefixCls }}-range-arrow"
          [style.left.px]="datePickerService?.arrowLeft"
        ></div>
        <div class="{{ prefixCls }}-panel-container">
          <div class="{{ prefixCls }}-panels">
            <ng-container
              *ngTemplateOutlet="tplInnerPopup; context: { partType: 'left' }"
            ></ng-container>
            <ng-container
              *ngTemplateOutlet="tplInnerPopup; context: { partType: 'right' }"
            ></ng-container>
          </div>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-container>
    <ng-template #singlePanel>
      <div
        *ngIf="opened"
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div
          class="{{ prefixCls }}-panel"
          [class.vts-picker-panel-rtl]="dir === 'rtl'"
          tabindex="-1"
        >
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup"></ng-container>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-template>

    <ng-template #tplInnerPopup let-partType="partType">
      <div
        class="{{ prefixCls }}-panel"
        [class.vts-picker-panel-rtl]="dir === 'rtl'"
        [style.display]="show(partType) ? 'block' : 'none'"
      >
        <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
        <inner-popup
          [showWeek]="showWeek"
          [endPanelMode]="getPanelMode(endPanelMode, partType)"
          [partType]="partType"
          [locale]="locale!"
          [showTimePicker]="hasTimePicker"
          [timeOptions]="getTimeOptions(partType)"
          [panelMode]="getPanelMode(panelMode, partType)"
          (panelModeChange)="onPanelModeChange($event, partType)"
          [activeDate]="getActiveDate(partType)"
          [value]="getValue(partType)"
          [disabledDate]="disabledDate"
          [dateRender]="dateRender"
          [selectedValue]="$any(datePickerService?.value)"
          [hoverValue]="$any(hoverValue)"
          (cellHover)="onCellHover($event)"
          (selectDate)="changeValueFromSelect($event, !showTime)"
          (selectTime)="onSelectTime($event, partType)"
          (headerChange)="onActiveDateChange($event, partType)"
        ></inner-popup>
      </div>
    </ng-template>

    <ng-template #tplFooter>
      <calendar-footer
        *ngIf="hasFooter"
        [locale]="locale!"
        [isRange]="isRange"
        [showToday]="showToday"
        [showNow]="showNow"
        [hasTimePicker]="hasTimePicker"
        [okDisabled]="!isAllowed($any(datePickerService?.value))"
        [extraFooter]="extraFooter"
        [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
        (clickOk)="onClickOk()"
        (clickToday)="onClickToday($event)"
      ></calendar-footer>
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      <li
        *ngFor="let name of getObjectKeys(ranges)"
        class="{{ prefixCls }}-preset"
        (click)="onClickPresetRange(ranges![name])"
        (mouseenter)="onHoverPresetRange(ranges![name])"
        (mouseleave)="onPresetRangeMouseLeave()"
      >
        <span class="vts-tag vts-tag-blue">{{ name }}</span>
      </li>
    </ng-template>
  `,
  host: {
    '(mousedown)': 'onMousedown($event)'
  }
})
export class DateRangePopupComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isRange!: boolean;
  @Input() inline: boolean = false;
  @Input() showWeek!: boolean;
  @Input() locale!: VtsCalendarI18nInterface | undefined;
  @Input() disabledDate?: DisabledDateFn;
  @Input() disabledTime?: DisabledTimeFn; // This will lead to rebuild time options
  @Input() showToday!: boolean;
  @Input() showNow!: boolean;
  @Input() showTime!: SupportTimeOptions | boolean;
  @Input() extraFooter?: TemplateRef<void> | string;
  @Input() ranges?: PresetRanges;
  @Input() dateRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;
  @Input() panelMode!: VtsDateMode | VtsDateMode[];
  @Input() defaultPickerValue!: CompatibleDate | undefined | null;
  @Output() readonly panelModeChange = new EventEmitter<VtsDateMode | VtsDateMode[]>();
  @Output() readonly calendarChange = new EventEmitter<CompatibleValue>();
  @Output() readonly resultOk = new EventEmitter<void>(); // Emitted when done with date selecting
  @Input() dir: Direction = 'ltr';
  @Input() opened: Boolean = false;

  prefixCls: string = PREFIX_CLASS;
  originalPanelMode: VtsDateMode | VtsDateMode[] = 'date';
  endPanelMode: VtsDateMode | VtsDateMode[] = 'date';
  timeOptions: SupportTimeOptions | SupportTimeOptions[] | null = null;
  hoverValue: SingleValue[] = []; // Range ONLY
  checkedPartArr: boolean[] = [false, false];
  destroy$ = new Subject();

  get hasTimePicker(): boolean {
    return !!this.showTime;
  }

  get hasFooter(): boolean {
    return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
  }

  constructor(public datePickerService: DatePickerService, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateActiveDate();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Parse showTime options
    if (changes.showTime || changes.disabledTime) {
      if (this.showTime) {
        this.buildTimeOptions();
      }
    }
    if (changes.panelMode) {
      this.endPanelMode = this.panelMode;
      this.originalPanelMode = this.panelMode;
    }
    if (changes.defaultPickerValue) {
      this.updateActiveDate();
    }
    if (changes.opened) {
      this.panelMode = this.originalPanelMode;
      this.endPanelMode = this.originalPanelMode;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateActiveDate(): void {
    const activeDate = this.datePickerService.hasValue()
      ? this.datePickerService.value
      : this.datePickerService.makeValue(this.defaultPickerValue!);
    this.datePickerService.setActiveDate(
      activeDate,
      this.hasTimePicker,
      this.getPanelMode(this.endPanelMode) as NormalizedMode
    );
  }

  init(): void {
    this.checkedPartArr = [false, false];
    this.updateActiveDate();
  }

  /**
   * Prevent input losing focus when click panel
   * @param event
   */
  onMousedown(event: MouseEvent): void {
    event.preventDefault();
  }

  onClickOk(): void {
    const inputIndex = { left: 0, right: 1 }[this.datePickerService.activeInput];
    const value: CandyDate = this.isRange
      ? (this.datePickerService.value as CandyDate[])[inputIndex]
      : (this.datePickerService.value as CandyDate);
    this.changeValueFromSelect(value);
    this.resultOk.emit();
  }

  onClickToday(value: CandyDate): void {
    this.changeValueFromSelect(value, !this.showTime);
  }

  onCellHover(value: CandyDate): void {
    if (!this.isRange) {
      return;
    }
    const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
    const base = (this.datePickerService.value as CandyDate[])[otherInputIndex]!;
    if (base) {
      if (base.isBeforeDay(value)) {
        this.hoverValue = [base, value];
      } else {
        this.hoverValue = [value, base];
      }
    }
  }

  onPanelModeChange(mode: VtsDateMode, partType?: RangePartType): void {
    if (this.isRange) {
      const index = this.datePickerService.getActiveIndex(partType);
      if (index === 0) {
        this.panelMode = [mode, this.panelMode[1]] as VtsDateMode[];
      } else {
        this.panelMode = [this.panelMode[0], mode] as VtsDateMode[];
      }
    } else {
      this.panelMode = mode;
    }
    this.panelModeChange.emit(this.panelMode);
  }

  onActiveDateChange(value: CandyDate, partType: RangePartType): void {
    if (this.isRange) {
      const activeDate: SingleValue[] = [];
      activeDate[this.datePickerService.getActiveIndex(partType)] = value;
      this.datePickerService.setActiveDate(
        activeDate,
        this.hasTimePicker,
        this.getPanelMode(this.endPanelMode, partType) as NormalizedMode
      );
    } else {
      this.datePickerService.setActiveDate(value);
    }
  }

  onSelectTime(value: CandyDate, partType?: RangePartType): void {
    if (this.isRange) {
      const newValue = cloneDate(this.datePickerService.value) as SingleValue[];
      const index = this.datePickerService.getActiveIndex(partType);
      newValue[index] = this.overrideHms(value, newValue[index]);
      this.datePickerService.setValue(newValue);
    } else {
      const newValue = this.overrideHms(value, this.datePickerService.value as CandyDate);
      this.datePickerService.setValue(newValue); // If not select a date currently, use today
    }
    this.datePickerService.inputPartChange$.next();
    this.buildTimeOptions();
  }

  changeValueFromSelect(value: CandyDate, emitValue: boolean = true): void {
    if (this.isRange) {
      const selectedValue: SingleValue[] = cloneDate(this.datePickerService.value) as CandyDate[];
      let checkedPart: RangePartType = this.datePickerService.activeInput;
      let nextPart: RangePartType = checkedPart;

      if (this.datePickerService.isRangeSingleMode) {
        if (checkedPart == 'right') {
          if (!selectedValue[this.datePickerService.getActiveIndex('left')]) {
            checkedPart = 'left';
            nextPart = checkedPart;
          } else {
            const leftValue = selectedValue[this.datePickerService.getActiveIndex('left')]
              ?.nativeDate as Date;
            if (this.datePickerService.compareDate(value.nativeDate, leftValue) == -1) {
              checkedPart = 'left';
              nextPart = checkedPart;
            }
          }
        }

        if (checkedPart == 'left') {
          selectedValue[this.datePickerService.getActiveIndex('right')] = null;
        }
      }

      selectedValue[this.datePickerService.getActiveIndex(checkedPart)] = value;
      this.checkedPartArr[this.datePickerService.getActiveIndex(checkedPart)] = true;
      this.hoverValue = selectedValue;

      if (emitValue) {
        if (this.inline) {
          // For UE, Should always be reversed, and clear vaue when next part is right
          nextPart = this.reversedPart(checkedPart);
          if (nextPart === 'right') {
            selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
            this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
          }
          this.datePickerService.setValue(selectedValue);
          this.calendarChange.emit(selectedValue);
          if (
            this.isBothAllowed(selectedValue) &&
            this.checkedPartArr[0] &&
            this.checkedPartArr[1]
          ) {
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          }
        } else {
          /**
           * if sort order is wrong, clear the other part's value
           */
          if (wrongSortOrder(selectedValue)) {
            nextPart = this.reversedPart(checkedPart);
            selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
            this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
          }

          this.datePickerService.setValue(selectedValue);
          /**
           * range date usually selected paired,
           * so we emit the date value only both date is allowed and both part are checked
           */
          if (
            this.isBothAllowed(selectedValue) &&
            this.checkedPartArr[0] &&
            this.checkedPartArr[1]
          ) {
            this.calendarChange.emit(selectedValue);
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          } else if (this.isAllowed(selectedValue)) {
            nextPart = this.reversedPart(checkedPart);
            this.calendarChange.emit([value.clone()]);
          }
        }
      } else {
        this.datePickerService.setValue(selectedValue);
      }
      this.datePickerService.inputPartChange$.next(nextPart);
    } else {
      this.datePickerService.setValue(value);
      this.datePickerService.inputPartChange$.next();

      if (emitValue && this.isAllowed(value)) {
        this.datePickerService.emitValue$.next();
      }
    }
  }

  reversedPart(part: RangePartType): RangePartType {
    return part === 'left' ? 'right' : 'left';
  }

  getPanelMode(panelMode: VtsDateMode | VtsDateMode[], partType?: RangePartType): VtsDateMode {
    if (this.isRange) {
      return panelMode[this.datePickerService.getActiveIndex(partType)] as VtsDateMode;
    } else {
      return panelMode as VtsDateMode;
    }
  }

  // Get single value or part value of a range
  getValue(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      return ((this.datePickerService.value as CandyDate[]) || [])[
        this.datePickerService.getActiveIndex(partType)
      ];
    } else {
      return this.datePickerService.value as CandyDate;
    }
  }

  getActiveDate(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      return (this.datePickerService.activeDate as CandyDate[])[
        this.datePickerService.getActiveIndex(partType)
      ];
    } else {
      return this.datePickerService.activeDate as CandyDate;
    }
  }

  disabledStartTime: DisabledTimeFn = (value: Date | Date[]) => {
    return this.disabledTime && this.disabledTime(value, 'start');
  };

  disabledEndTime: DisabledTimeFn = (value: Date | Date[]) => {
    return this.disabledTime && this.disabledTime(value, 'end');
  };

  isOneAllowed(selectedValue: SingleValue[]): boolean {
    const index = this.datePickerService.getActiveIndex();
    const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
    return isAllowedDate(selectedValue[index]!, this.disabledDate, disabledTimeArr[index]);
  }

  isBothAllowed(selectedValue: SingleValue[]): boolean {
    return (
      isAllowedDate(selectedValue[0]!, this.disabledDate, this.disabledStartTime) &&
      isAllowedDate(selectedValue[1]!, this.disabledDate, this.disabledEndTime)
    );
  }

  isAllowed(value: CompatibleValue, isBoth: boolean = false): boolean {
    if (this.isRange) {
      return isBoth
        ? this.isBothAllowed(value as CandyDate[])
        : this.isOneAllowed(value as CandyDate[]);
    } else {
      return isAllowedDate(value as CandyDate, this.disabledDate, this.disabledTime);
    }
  }

  getTimeOptions(partType?: RangePartType): SupportTimeOptions | null {
    if (this.showTime && this.timeOptions) {
      return this.timeOptions instanceof Array
        ? this.timeOptions[this.datePickerService.getActiveIndex(partType)]
        : this.timeOptions;
    }
    return null;
  }

  onClickPresetRange(val: PresetRanges[keyof PresetRanges]): void {
    const value = typeof val === 'function' ? val() : val;
    if (value) {
      this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
      this.datePickerService.emitValue$.next();
    }
  }

  onPresetRangeMouseLeave(): void {
    this.clearHoverValue();
  }

  onHoverPresetRange(val: PresetRanges[keyof PresetRanges]): void {
    if (typeof val !== 'function') {
      this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
    }
  }

  getObjectKeys(obj?: PresetRanges): string[] {
    return obj ? Object.keys(obj) : [];
  }

  show(partType: RangePartType): boolean {
    const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
    return !hide;
  }

  private clearHoverValue(): void {
    this.hoverValue = [];
  }

  private buildTimeOptions(): void {
    if (this.showTime) {
      const showTime = typeof this.showTime === 'object' ? this.showTime : {};
      if (this.isRange) {
        const value = this.datePickerService.value as CandyDate[];
        this.timeOptions = [
          this.overrideTimeOptions(showTime, value[0], 'start'),
          this.overrideTimeOptions(showTime, value[1], 'end')
        ];
      } else {
        this.timeOptions = this.overrideTimeOptions(
          showTime,
          this.datePickerService.value as CandyDate
        );
      }
    } else {
      this.timeOptions = null;
    }
  }

  private overrideTimeOptions(
    origin: SupportTimeOptions,
    value: CandyDate,
    partial?: DisabledTimePartial
  ): SupportTimeOptions {
    let disabledTimeFn;
    if (partial) {
      disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
    } else {
      disabledTimeFn = this.disabledTime;
    }
    return { ...origin, ...getTimeConfig(value, disabledTimeFn) };
  }

  private overrideHms(newValue: CandyDate | null, oldValue: CandyDate | null): CandyDate {
    // tslint:disable-next-line:no-parameter-reassignment
    newValue = newValue || new CandyDate();
    // tslint:disable-next-line:no-parameter-reassignment
    oldValue = oldValue || new CandyDate();
    return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
  }
}
