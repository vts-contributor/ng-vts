/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, VtsSafeAny, OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsRadioButtonDirective } from './radio-button.directive';
import { VtsRadioService } from './radio.service';

@Component({
  selector: '[vts-radio],[vts-radio-button]',
  exportAs: 'vtsRadio',
  preserveWhitespaces: false,
  template: `
    <span
      [class.vts-radio]="!isRadioButton"
      [class.vts-radio-checked]="isChecked && !isRadioButton"
      [class.vts-radio-disabled]="vtsDisabled && !isRadioButton"
      [class.vts-radio-button]="isRadioButton"
      [class.vts-radio-button-checked]="isChecked && isRadioButton"
      [class.vts-radio-button-disabled]="vtsDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="vtsAutoFocus ? 'autofocus' : null"
        [class.vts-radio-input]="!isRadioButton"
        [class.vts-radio-button-input]="isRadioButton"
        [disabled]="vtsDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span
        [class.vts-radio-inner]="!isRadioButton"
        [class.vts-radio-button-inner]="isRadioButton"
      ></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsRadioComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-radio-wrapper]': '!isRadioButton',
    '[class.vts-radio-button-wrapper]': 'isRadioButton',
    '[class.vts-radio-wrapper-checked]': 'isChecked && !isRadioButton',
    '[class.vts-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
    '[class.vts-radio-wrapper-disabled]': 'vtsDisabled && !isRadioButton',
    '[class.vts-radio-button-wrapper-disabled]': 'vtsDisabled && isRadioButton',
    '[class.vts-radio-wrapper-rtl]': `!isRadioButton && dir === 'rtl'`,
    '[class.vts-radio-button-wrapper-rtl]': `isRadioButton && dir === 'rtl'`,
    '(click)': 'onHostClick($event)'
  }
})
export class VtsRadioComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;

  private isNgModel = false;
  private destroy$ = new Subject<void>();
  isChecked = false;
  name: string | null = null;
  isRadioButton = !!this.vtsRadioButtonDirective;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() vtsValue: VtsSafeAny | null = null;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsAutoFocus = false;

  dir: Direction = 'ltr';

  onHostClick(event: MouseEvent): void {
    /** prevent label click triggered twice. **/
    event.stopPropagation();
    event.preventDefault();
    if (!this.vtsDisabled && !this.isChecked) {
      if (this.vtsRadioService) {
        this.vtsRadioService.select(this.vtsValue);
      }
      if (this.isNgModel) {
        this.isChecked = true;
        this.onChange(true);
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement!, 'keyboard');
  }

  blur(): void {
    this.inputElement!.nativeElement.blur();
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality,
    @Optional() private vtsRadioService: VtsRadioService,
    @Optional() private vtsRadioButtonDirective: VtsRadioButtonDirective
  ) {}

  setDisabledState(disabled: boolean): void {
    this.vtsDisabled = disabled;
    this.cdr.markForCheck();
  }

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.isNgModel = true;
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (this.vtsRadioService) {
      this.vtsRadioService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => {
        this.name = name;
        this.cdr.markForCheck();
      });
      this.vtsRadioService.disabled$.pipe(takeUntil(this.destroy$)).subscribe(disabled => {
        this.vtsDisabled = disabled;
        this.cdr.markForCheck();
      });
      this.vtsRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.isChecked = this.vtsValue === value;
        this.cdr.markForCheck();
      });
    }
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
        if (this.vtsRadioService) {
          this.vtsRadioService.touch();
        }
      }
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterViewInit(): void {
    if (this.vtsAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
}
