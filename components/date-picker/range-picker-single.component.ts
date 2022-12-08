import { AfterContentInit, Input } from '@angular/core';
import {
  ChangeDetectorRef,
  Directive,
  Host,
  OnChanges,
  Optional,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CandyDate, CompatibleValue } from '@ui-vts/ng-vts/core/time';
import { OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { DateHelperService } from '@ui-vts/ng-vts/i18n';
import { VtsDatePickerComponent, VtsPlacement } from './date-picker.component';
import { DatePickerService } from './date-picker.service';

export type VtsDatePickerSizeType = 'xl' | 'lg' | 'md' | 'sm';

@Directive({
  selector: 'vts-range-picker-single',
  exportAs: 'vtsRangePicker'
})
export class VtsRangePickerSingleComponent
  implements OnChanges, ControlValueAccessor, AfterContentInit
{
  isRange = true;
  isRangeSingleMode = true;
  format = 'dd/MM/yyyy';
  rangeFormat = 'dd/MM/yyyy - dd/MM/yyyy';
  startValue: any;
  endValue: any;

  dateValue: Date[] | null = [new Date(), new Date()];

  @Input() vtsPlaceHolder: string | string[] = ['', ''];
  @Input() vtsPlacement: VtsPlacement = 'bottomLeft';

  constructor(
    protected cdr: ChangeDetectorRef,
    public datePickerService: DatePickerService,
    private dateHelper: DateHelperService,
    @Optional() @Host() public datePicker: VtsDatePickerComponent
  ) {
    this.datePicker.isRange = this.isRange;
    this.datePicker.isRangeSingleMode = this.isRangeSingleMode;
    this.datePicker.registerOnChange = this.registerOnChange;
    this.datePicker.registerOnTouched = this.registerOnTouched;
    this.datePicker.writeValue = this.writeValue;
    this.datePicker.onCalendarChange = this.onCalendarChange;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsPlaceHolder?.currentValue) {
      if (typeof changes.vtsPlaceHolder?.currentValue == 'string')
        this.datePicker.vtsPlaceHolder = [
          changes.vtsPlaceHolder?.currentValue,
          changes.vtsPlaceHolder?.currentValue
        ];
      else this.datePicker.vtsPlaceHolder = changes.vtsPlaceHolder?.currentValue;
    }
  }

  ngAfterContentInit() {
    this.datePicker.picker.onInputChange = this.onInputChange.bind(this);
  }

  onChangeFn: OnChangeType = () => void 0;
  onTouchedFn: OnTouchedType = () => void 0;

  writeValue(value: Date[]): void {
    const newValue: CompatibleValue = this.datePickerService.makeValue(value);
    this.datePickerService.setValue(newValue);
    this.datePickerService.initialValue = newValue;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouchedFn = fn;
  }

  onCalendarChange(value: CompatibleValue): void {
    if (Array.isArray(value)) {
      const rangeValue = value.filter(x => x instanceof CandyDate).map(x => x!.nativeDate);
      this.onChangeFn(rangeValue);
    }
  }

  onInputChange(value: string) {
    const rangeRegex = /^\d{2}\/\d{2}\/\d{4} \- \d{2}\/\d{2}\/\d{4}$/;
    if (!this.datePicker.picker.realOpenState) {
      this.datePicker.picker.showOverlay();
    }

    if (!value) {
      this.datePickerService.setValue([]);
      this.onCalendarChange([]);
      return;
    }

    if (rangeRegex.test(value)) {
      const values = value.split(' - ');
      const parses = values.map(d => new CandyDate(this.dateHelper.parseDate(d, this.format)));
      if (parses.every(d => d.isValid())) {
        this.datePickerService.setValue(parses);
        this.datePickerService.activeInput = 'left';
        this.datePicker.picker.panel.changeValueFromSelect(parses[0], false);
        this.datePickerService.activeInput = 'right';
        this.datePicker.picker.panel.changeValueFromSelect(parses[1], true);
      }
      return;
    }
  }

  checkCellInRange(current: Date) {
    return (
      !!this.startValue &&
      !!this.endValue &&
      this.compareDate(current, this.startValue) >= 0 &&
      this.compareDate(current, this.endValue) <= 0
    );
  }

  compareDate(source: Date, dest: Date, includeTime = false) {
    const s = source;
    const d = dest;
    if (!includeTime) {
      s.setHours(0);
      s.setMinutes(0);
      s.setSeconds(0);
      s.setMilliseconds(0);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    }

    if (s.getTime() > d.getTime()) return 1;
    if (s.getTime() < d.getTime()) return -1;
    return 0;
  }

  isNotCompleteRange() {
    return !this.startValue || !this.endValue;
  }

  onEndValueChange(e: Date) {
    this.endValue = e;
    if (
      !!this.startValue &&
      !!this.endValue &&
      this.compareDate(this.startValue, this.endValue) == 1
    )
      this.startValue = null;
    this.onChangeFn([this.startValue, this.endValue]);
  }
}
