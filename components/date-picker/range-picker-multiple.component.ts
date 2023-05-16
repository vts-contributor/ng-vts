import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import {
  BooleanInput,
  OnChangeType,
  OnTouchedType,
  VtsSizeXLMSType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsDatePickerComponent, VtsPlacement } from './date-picker.component';
import { DatePickerService } from './date-picker.service';
import { VtsDateMode } from './standard-types';

export type VtsDatePickerSizeType = 'xl' | 'lg' | 'md' | 'sm';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-range-picker-multiple',
  exportAs: 'vtsDatePicker',
  template: `
    <vts-input-group vts-row>
      <div vts-col vtsFlex="1">
        <vts-date-picker
          #startDatePicker
          [vtsSize]="vtsSize"
          [vtsMode]="'date'"
          [ngModel]="startValue"
          (ngModelChange)="onStartValueChange($event)"
          [vtsDateRender]="tplRender"
          [vtsDisabled]="disabled"
          [vtsPlaceHolder]="vtsPlaceHolder[0]"
          [vtsShowTime]="vtsShowTime"
          vtsShowToday="false"
          [vtsFormat]="vtsFormat"
          (vtsOpenChange)="handleStartOpenChange($event)"
          [vtsPlacement]="vtsPlacement"
        ></vts-date-picker>
      </div>

      <div
        style="display: flex;align-items: center;justify-content: center"
        vts-col
        [vtsFlex]="gutter + 'px'"
      >
        <i style="font-size: 10px" vts-icon vtsType="MinusDoutone"></i>
      </div>

      <div vts-col vtsFlex="1">
        <vts-date-picker
          #endDatePicker
          [vtsSize]="vtsSize"
          [vtsMode]="'date'"
          [ngModel]="endValue"
          (ngModelChange)="onEndValueChange($event)"
          [vtsDateRender]="tplRender"
          [vtsDisabled]="disabled"
          [vtsPlaceHolder]="vtsPlaceHolder[1]"
          [vtsShowTime]="vtsShowTime"
          vtsShowToday="false"
          [vtsFormat]="vtsFormat"
          (vtsOpenChange)="handleEndOpenChange($event)"
          [vtsPlacement]="vtsPlacement"
        ></vts-date-picker>
      </div>
    </vts-input-group>

    <ng-template #tplRender let-current>
      <div
        class="vts-picker-cell-inner"
        [class.vts-picker-cell-inner-range-selected-start]="
          !!startViewDate && compareDate(current, startViewDate, false) == 0
        "
        [class.vts-picker-cell-inner-range-selected-end]="
          !!endViewDate && compareDate(current, endViewDate, false) == 0
        "
        [class.vts-picker-cell-inner-range-indeterminate]="isNotCompleteRange()"
        [class.vts-picker-cell-inner-range-contain]="checkCellInRange(current)"
      >
        {{ current.getDate() }}
      </div>
    </ng-template>
  `,
  host: {},
  providers: [
    DatePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => VtsRangePickerMultipleComponent)
    }
  ]
})
export class VtsRangePickerMultipleComponent
  implements AfterViewInit, OnChanges, ControlValueAccessor
{
  destroy$ = new Subject();

  isRange = true;
  isRangeSingleMode = false;
  toggleOtherPanel: boolean = false;
  startValue: Date | undefined;
  endValue: Date | undefined;
  startViewDate: Date | undefined;
  endViewDate: Date | undefined;

  vtsMode: VtsDateMode = 'date';

  @ViewChild('startDatePicker') startDatePicker!: VtsDatePickerComponent;
  @ViewChild('endDatePicker') endDatePicker!: VtsDatePickerComponent;

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsShowTime: BooleanInput | null | undefined;
  static ngAcceptInputType_vtsAutoOpen: BooleanInput | null | undefined;

  @Input() gutter: Number = 26;
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() vtsPlaceHolder: string[] = ['', ''];
  @Input() @InputBoolean() set disabled(value: boolean) {
    this.vtsDisabled = value;
  }
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Input() @InputBoolean() vtsShowTime: boolean = false;
  @Input() @InputBoolean() vtsAutoOpen: boolean = true;
  @Input() vtsFormat!: string;
  @Input() vtsPlacement: VtsPlacement = 'bottomLeft';

  constructor(protected cdr: ChangeDetectorRef, public datePickerService: DatePickerService) {
    this.datePickerService.isRange = this.isRange;
    this.datePickerService.isRangeSingleMode = this.isRangeSingleMode;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsPlaceHolder?.currentValue) {
      this.vtsPlaceHolder = changes.vtsPlaceHolder?.currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.startDatePicker.datePickerService.valueChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.startViewDate = value ? (value as CandyDate).nativeDate : undefined;
      });
    this.endDatePicker.datePickerService.valueChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.endViewDate = value ? (value as CandyDate).nativeDate : undefined;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkCellInRange(current: Date) {
    return (
      !!this.startViewDate &&
      !!this.endViewDate &&
      this.compareDate(current, this.startViewDate, false) >= 0 &&
      this.compareDate(current, this.endViewDate, false) <= 0
    );
  }

  compareDate = (source: Date, dest: Date, includeTime = this.vtsShowTime) =>
    this.datePickerService.compareDate(source, dest, includeTime);

  isNotCompleteRange() {
    return !this.startViewDate || !this.endViewDate;
  }

  onChangeFn: OnChangeType = () => void 0;
  onTouchedFn: OnTouchedType = () => void 0;

  writeValue(value: Date[]): void {
    this.startValue = (value && value[0]) || null;
    this.endValue = (value && value[1]) || null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouchedFn = fn;
  }

  onStartValueChange(e: Date) {
    if (!!this.startValue && this.compareDate(this.startValue, e) == 0) {
      this.toggleOtherPanel = false;
      return;
    }

    this.startValue = e;
    if (
      !!this.startValue &&
      !!this.endValue &&
      this.compareDate(this.startValue, this.endValue) == 1
    ) {
      this.endValue = undefined;
      this.endViewDate = undefined;
    }
    this.toggleOtherPanel = true;
    this.onChangeFn([this.startValue, this.endValue]);
  }

  onEndValueChange(e: Date) {
    if (!!this.endValue && this.compareDate(this.endValue, e) == 0) {
      this.toggleOtherPanel = false;
      return;
    }

    this.endValue = e;
    if (
      !!this.startValue &&
      !!this.endValue &&
      this.compareDate(this.startValue, this.endValue) == 1
    ) {
      this.startValue = undefined;
      this.startViewDate = undefined;
    }
    this.toggleOtherPanel = true;
    this.onChangeFn([this.startValue, this.endValue]);
  }

  handleStartOpenChange(open: boolean): void {
    if (!open && this.toggleOtherPanel && this.vtsAutoOpen && this.startValue && !this.endValue) {
      this.endDatePicker.open();
      return;
    }
  }

  handleEndOpenChange(open: boolean): void {
    if (!open && this.toggleOtherPanel && this.vtsAutoOpen && this.endValue && !this.startValue) {
      this.startDatePicker.open();
      return;
    }
  }
}
