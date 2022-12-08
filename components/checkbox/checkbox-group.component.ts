/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface VtsCheckBoxOptionInterface {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'vts-checkbox-group',
  exportAs: 'vtsCheckboxGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label
      vts-checkbox
      class="vts-checkbox-group-item"
      *ngFor="let o of options; trackBy: trackByOption"
      [vtsDisabled]="o.disabled || vtsDisabled"
      [vtsChecked]="o.checked!"
      (vtsCheckedChange)="onCheckedChange(o, $event)"
    >
      <span>{{ o.label }}</span>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsCheckboxGroupComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-checkbox-group-rtl]': `dir === 'rtl'`
  }
})
export class VtsCheckboxGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  options: VtsCheckBoxOptionInterface[] = [];
  @Input() @InputBoolean() vtsDisabled = false;

  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  trackByOption(_: number, option: VtsCheckBoxOptionInterface): string {
    return option.value;
  }

  onCheckedChange(option: VtsCheckBoxOptionInterface, checked: boolean): void {
    option.checked = checked;
    this.onChange(this.options);
  }

  constructor(
    private elementRef: ElementRef,
    private focusMonitor: FocusMonitor,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-checkbox-group');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: VtsCheckBoxOptionInterface[]): void {
    this.options = value;
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
}
