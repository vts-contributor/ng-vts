/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, VtsSafeAny, OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsCheckboxWrapperComponent } from './checkbox-wrapper.component';

@Component({
  selector: '[vts-checkbox]',
  exportAs: 'vtsCheckbox',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      class="vts-checkbox"
      [class.vts-checkbox-checked]="vtsChecked && !vtsIndeterminate"
      [class.vts-checkbox-disabled]="vtsDisabled"
      [class.vts-checkbox-indeterminate]="vtsIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="vts-checkbox-input"
        [attr.autofocus]="vtsAutoFocus ? 'autofocus' : null"
        [checked]="vtsChecked"
        [ngModel]="vtsChecked"
        [disabled]="vtsDisabled"
        (ngModelChange)="innerCheckedChange($event)"
        (click)="$event.stopPropagation()"
      />
      <span class="vts-checkbox-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsCheckboxComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-checkbox-wrapper-checked]': 'vtsChecked',
    '[class.vts-checkbox-rtl]': `dir === 'rtl'`,
    '(click)': 'hostClick($event)'
  }
})
export class VtsCheckboxComponent
  implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit
{
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsIndeterminate: BooleanInput;
  static ngAcceptInputType_vtsChecked: BooleanInput;

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('inputElement', { static: true })
  private inputElement!: ElementRef;
  @Output() readonly vtsCheckedChange = new EventEmitter<boolean>();
  @Input() vtsValue: VtsSafeAny | null = null;
  @Input() @InputBoolean() vtsAutoFocus = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsIndeterminate = false;
  @Input() @InputBoolean() vtsChecked = false;

  hostClick(e: MouseEvent): void {
    e.preventDefault();
    this.focus();
    this.innerCheckedChange(!this.vtsChecked);
  }

  innerCheckedChange(checked: boolean): void {
    if (!this.vtsDisabled) {
      this.vtsChecked = checked;
      this.onChange(this.vtsChecked);
      this.vtsCheckedChange.emit(this.vtsChecked);
      if (this.vtsCheckboxWrapperComponent) {
        this.vtsCheckboxWrapperComponent.onChange();
      }
    }
  }

  writeValue(value: boolean): void {
    this.vtsChecked = value;
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
    private elementRef: ElementRef<HTMLElement>,
    @Optional()
    private vtsCheckboxWrapperComponent: VtsCheckboxWrapperComponent,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-checkbox-wrapper');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });
    if (this.vtsCheckboxWrapperComponent) {
      this.vtsCheckboxWrapperComponent.addCheckbox(this);
    }

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
    this.focusMonitor.stopMonitoring(this.elementRef);
    if (this.vtsCheckboxWrapperComponent) {
      this.vtsCheckboxWrapperComponent.removeCheckbox(this);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
