/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  BooleanInput,
  VtsSizeLDSType,
  OnChangeType,
  OnTouchedType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean, isNotNil } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-input-number',
  exportAs: 'vtsInputNumber',
  template: `
    <div class="vts-input-number-handler-wrap">
      <span
        unselectable="unselectable"
        class="vts-input-number-handler vts-input-number-handler-up"
        (mousedown)="up($event)"
        (mouseup)="stop()"
        (mouseleave)="stop()"
        [class.vts-input-number-handler-up-disabled]="disabledUp"
      >
        <i vts-icon vtsType="ArrowUpOutline" class="vts-input-number-handler-up-inner"></i>
      </span>
      <span
        unselectable="unselectable"
        class="vts-input-number-handler vts-input-number-handler-down"
        (mousedown)="down($event)"
        (mouseup)="stop()"
        (mouseleave)="stop()"
        [class.vts-input-number-handler-down-disabled]="disabledDown"
      >
        <i vts-icon vtsType="ArrowDownOutline" class="vts-input-number-handler-down-inner"></i>
      </span>
    </div>
    <div class="vts-input-number-input-wrap">
      <input
        #inputElement
        autocomplete="off"
        class="vts-input-number-input"
        [attr.id]="vtsId"
        [attr.autofocus]="vtsAutoFocus ? 'autofocus' : null"
        [disabled]="vtsDisabled"
        [attr.min]="vtsMin"
        [attr.max]="vtsMax"
        [placeholder]="vtsPlaceHolder"
        [attr.step]="vtsStep"
        [attr.inputmode]="vtsInputMode"
        (keydown)="onKeyDown($event)"
        (keyup)="stop()"
        [ngModel]="displayValue"
        (ngModelChange)="onModelChange($event)"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsInputNumberComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-input-number-focused]': 'isFocused',
    '[class.vts-input-number-lg]': `vtsSize === 'lg'`,
    '[class.vts-input-number-sm]': `vtsSize === 'sm'`,
    '[class.vts-input-number-disabled]': 'vtsDisabled',
    '[class.vts-input-number-rtl]': `dir === 'rtl'`
  }
})
export class VtsInputNumberComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, OnDestroy
{
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;

  private autoStepTimer?: number | ReturnType<typeof setTimeout>;
  private parsedValue?: string | number;
  private value?: number;
  private destroy$ = new Subject<void>();
  displayValue?: string | number;
  isFocused = false;
  disabledUp = false;
  disabledDown = false;
  dir: Direction = 'ltr';
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Output() readonly vtsBlur = new EventEmitter();
  @Output() readonly vtsFocus = new EventEmitter();
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;
  @Input() vtsSize: VtsSizeLDSType = 'md';
  @Input() vtsMin: number = -Infinity;
  @Input() vtsMax: number = Infinity;
  @Input() vtsParser = (value: string) =>
    value
      .trim()
      .replace(/。/g, '.')
      .replace(/[^\w\.-]+/g, '');
  @Input() vtsPrecision?: number;
  @Input() vtsPrecisionMode:
    | 'cut'
    | 'toFixed'
    | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Input() vtsPlaceHolder = '';
  @Input() vtsStep = 1;
  @Input() vtsInputMode: string = 'decimal';
  @Input() vtsId: string | null = null;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsAutoFocus = false;
  @Input() vtsFormatter: (value: number) => string | number = value => value;

  onModelChange(value: string): void {
    this.parsedValue = this.vtsParser(value);
    this.inputElement.nativeElement.value = `${this.parsedValue}`;
    const validValue = this.getCurrentValidValue(this.parsedValue);
    this.setValue(validValue);
  }

  getCurrentValidValue(value: string | number): number {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = `${this.getValidValue(val)}`;
    } else {
      val = this.value!;
    }
    return this.toNumber(val);
  }

  // '1.' '1x' 'xx' '' => are not complete numbers
  isNotCompleteNumber(num: string | number): boolean {
    return (
      isNaN(num as number) ||
      num === '' ||
      num === null ||
      !!(num && num.toString().indexOf('.') === num.toString().length - 1)
    );
  }

  getValidValue(value?: string | number): string | number | undefined {
    let val = parseFloat(value as string);
    // https://github.com/ant-design-git/ant-design-git/issues/7358
    if (isNaN(val)) {
      return value;
    }
    if (val < this.vtsMin) {
      val = this.vtsMin;
    }
    if (val > this.vtsMax) {
      val = this.vtsMax;
    }
    return val;
  }

  toNumber(num: string | number): number {
    if (this.isNotCompleteNumber(num)) {
      return num as number;
    }
    const numStr = String(num);
    if (numStr.indexOf('.') >= 0 && isNotNil(this.vtsPrecision)) {
      if (typeof this.vtsPrecisionMode === 'function') {
        return this.vtsPrecisionMode(num, this.vtsPrecision);
      } else if (this.vtsPrecisionMode === 'cut') {
        const numSplit = numStr.split('.');
        numSplit[1] = numSplit[1].slice(0, this.vtsPrecision);
        return Number(numSplit.join('.'));
      }
      return Number(Number(num).toFixed(this.vtsPrecision));
    }
    return Number(num);
  }

  getRatio(e: KeyboardEvent): number {
    let ratio = 1;
    if (e.metaKey || e.ctrlKey) {
      ratio = 0.1;
    } else if (e.shiftKey) {
      ratio = 10;
    }
    return ratio;
  }

  down(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('down', e, ratio);
  }

  up(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('up', e, ratio);
  }

  getPrecision(value: number): number {
    const valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  }

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // if this.props.precision is undefined
  // https://github.com/react-component/input-number/issues/39
  getMaxPrecision(currentValue: string | number, ratio: number): number {
    if (isNotNil(this.vtsPrecision)) {
      return this.vtsPrecision;
    }
    const ratioPrecision = this.getPrecision(ratio);
    const stepPrecision = this.getPrecision(this.vtsStep);
    const currentValuePrecision = this.getPrecision(currentValue as number);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  }

  getPrecisionFactor(currentValue: string | number, ratio: number): number {
    const precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  }

  upStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result = (
        (precisionFactor * val + precisionFactor * this.vtsStep * rat) /
        precisionFactor
      ).toFixed(precision);
    } else {
      result = this.vtsMin === -Infinity ? this.vtsStep : this.vtsMin;
    }
    return this.toNumber(result);
  }

  downStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result = (
        (precisionFactor * val - precisionFactor * this.vtsStep * rat) /
        precisionFactor
      ).toFixed(precision);
    } else {
      result = this.vtsMin === -Infinity ? -this.vtsStep : this.vtsMin;
    }
    return this.toNumber(result);
  }

  step<T extends keyof VtsInputNumberComponent>(
    type: T,
    e: MouseEvent | KeyboardEvent,
    ratio: number = 1
  ): void {
    this.stop();
    e.preventDefault();
    if (this.vtsDisabled) {
      return;
    }
    const value = this.getCurrentValidValue(this.parsedValue!) || 0;
    let val = 0;
    if (type === 'up') {
      val = this.upStep(value, ratio);
    } else if (type === 'down') {
      val = this.downStep(value, ratio);
    }
    const outOfRange = val > this.vtsMax || val < this.vtsMin;
    if (val > this.vtsMax) {
      val = this.vtsMax;
    } else if (val < this.vtsMin) {
      val = this.vtsMin;
    }
    this.setValue(val);
    this.updateDisplayValue(val);
    this.isFocused = true;
    if (outOfRange) {
      return;
    }
    this.autoStepTimer = setTimeout(() => {
      (this[type] as (e: MouseEvent | KeyboardEvent, ratio: number) => void)(e, ratio);
    }, 300);
  }

  stop(): void {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  setValue(value: number): void {
    if (`${this.value}` !== `${value}`) {
      this.onChange(value);
    }
    this.value = value;
    this.parsedValue = value;
    this.disabledUp = this.disabledDown = false;
    if (value || value === 0) {
      const val = Number(value);
      if (val >= this.vtsMax) {
        this.disabledUp = true;
      }
      if (val <= this.vtsMin) {
        this.disabledDown = true;
      }
    }
  }

  updateDisplayValue(value: number): void {
    const displayValue = isNotNil(this.vtsFormatter(value)) ? this.vtsFormatter(value) : '';
    this.displayValue = displayValue;
    this.inputElement.nativeElement.value = `${displayValue}`;
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === UP_ARROW) {
      const ratio = this.getRatio(e);
      this.up(e, ratio);
      this.stop();
    } else if (e.keyCode === DOWN_ARROW) {
      const ratio = this.getRatio(e);
      this.down(e, ratio);
      this.stop();
    } else if (e.keyCode === ENTER) {
      this.updateDisplayValue(this.value!);
    }
  }

  writeValue(value: number): void {
    this.value = value;
    this.setValue(value);
    this.updateDisplayValue(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.vtsDisabled = disabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-input-number');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this.isFocused = false;
        this.updateDisplayValue(this.value!);
        this.vtsBlur.emit();
        Promise.resolve().then(() => this.onTouched());
      } else {
        this.isFocused = true;
        this.vtsFocus.emit();
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsFormatter && !changes.vtsFormatter.isFirstChange()) {
      const validValue = this.getCurrentValidValue(this.parsedValue!);
      this.setValue(validValue);
      this.updateDisplayValue(validValue);
    }
  }

  ngAfterViewInit(): void {
    if (this.vtsAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
