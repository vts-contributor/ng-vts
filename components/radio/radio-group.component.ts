/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BooleanInput,
  OnChangeType,
  OnTouchedType,
  VtsSafeAny,
  VtsSizeLDSType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsRadioService } from './radio.service';

export type VtsRadioButtonStyle = 'outline' | 'solid';

@Component({
  selector: 'vts-radio-group',
  exportAs: 'vtsRadioGroup',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    VtsRadioService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsRadioGroupComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-radio-group-solid]': `vtsButtonStyle === 'solid'`,
    '[class.vts-radio-group-rtl]': `dir === 'rtl'`
  }
})
export class VtsRadioGroupComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  private value: VtsSafeAny | null = null;
  private destroy$ = new Subject();
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() vtsButtonStyle: VtsRadioButtonStyle = 'outline';
  @Input() vtsSize: VtsSizeLDSType = 'md';
  @Input() vtsName: string | null = null;

  dir: Direction = 'ltr';

  constructor(
    private cdr: ChangeDetectorRef,
    private vtsRadioService: VtsRadioService,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-radio-group');
  }

  ngOnInit(): void {
    this.vtsRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.value !== value) {
        this.value = value;
        this.onChange(this.value);
      }
    });
    this.vtsRadioService.touched$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      Promise.resolve().then(() => this.onTouched());
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsDisabled, vtsName } = changes;
    if (vtsDisabled) {
      this.vtsRadioService.setDisabled(this.vtsDisabled);
    }
    if (vtsName) {
      this.vtsRadioService.setName(this.vtsName!);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: VtsSafeAny): void {
    this.value = value;
    this.vtsRadioService.select(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
    this.vtsRadioService.setDisabled(isDisabled);
    this.cdr.markForCheck();
  }
}
