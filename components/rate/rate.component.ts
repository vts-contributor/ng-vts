/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
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
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NgClassType, NumberInput } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'rate';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-rate',
  exportAs: 'vtsRate',
  preserveWhitespaces: false,
  template: `
    <ul
      #ulElement
      class="vts-rate"
      [class.vts-rate-disabled]="vtsDisabled"
      [class.vts-rate-rtl]="dir === 'rtl'"
      [ngClass]="classMap"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="vtsDisabled ? -1 : 1"
    >
      <li
        *ngFor="let star of starArray; let i = index"
        class="vts-rate-star"
        [ngClass]="starStyleArray[i] || ''"
        vts-tooltip
        [vtsTooltipTitle]="vtsTooltips[i]"
      >
        <div
          vts-rate-item
          [allowHalf]="vtsAllowHalf"
          [character]="vtsCharacter"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsRateComponent),
      multi: true
    }
  ]
})
export class VtsRateComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsAllowClear: BooleanInput;
  static ngAcceptInputType_vtsAllowHalf: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_vtsCount: NumberInput;

  @ViewChild('ulElement', { static: false }) private ulElement?: ElementRef;

  @Input() @WithConfig() @InputBoolean() vtsAllowClear: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsAllowHalf: boolean = false;
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Input() @InputBoolean() vtsAutoFocus: boolean = false;
  @Input() vtsCharacter!: TemplateRef<void>;
  @Input() @InputNumber() vtsCount: number = 5;
  @Input() vtsTooltips: string[] = [];
  @Output() readonly vtsOnBlur = new EventEmitter<FocusEvent>();
  @Output() readonly vtsOnFocus = new EventEmitter<FocusEvent>();
  @Output() readonly vtsOnHoverChange = new EventEmitter<number>();
  @Output() readonly vtsOnKeyDown = new EventEmitter<KeyboardEvent>();

  classMap: NgClassType = {};
  starArray: number[] = [];
  starStyleArray: NgClassType[] = [];
  dir: Direction = 'ltr';

  private readonly destroy$ = new Subject<void>();
  private hasHalf = false;
  private hoverValue = 0;
  private isFocused = false;
  private _value = 0;

  get vtsValue(): number {
    return this._value;
  }

  set vtsValue(input: number) {
    if (this._value === input) {
      return;
    }

    this._value = input;
    this.hasHalf = !Number.isInteger(input);
    this.hoverValue = Math.ceil(input);
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsAutoFocus, vtsCount, vtsValue } = changes;

    if (vtsAutoFocus && !vtsAutoFocus.isFirstChange()) {
      const el = this.ulElement!.nativeElement;
      if (this.vtsAutoFocus && !this.vtsDisabled) {
        this.renderer.setAttribute(el, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(el, 'autofocus');
      }
    }

    if (vtsCount) {
      this.updateStarArray();
    }

    if (vtsValue) {
      this.updateStarStyle();
    }
  }

  ngOnInit(): void {
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onItemClick(index: number, isHalf: boolean): void {
    if (this.vtsDisabled) {
      return;
    }

    this.hoverValue = index + 1;

    const actualValue = isHalf ? index + 0.5 : index + 1;

    if (this.vtsValue === actualValue) {
      if (this.vtsAllowClear) {
        this.vtsValue = 0;
        this.onChange(this.vtsValue);
      }
    } else {
      this.vtsValue = actualValue;
      this.onChange(this.vtsValue);
    }

    this.updateStarStyle();
  }

  onItemHover(index: number, isHalf: boolean): void {
    if (this.vtsDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
      return;
    }

    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    this.vtsOnHoverChange.emit(this.hoverValue);

    this.updateStarStyle();
  }

  onRateLeave(): void {
    this.hasHalf = !Number.isInteger(this.vtsValue);
    this.hoverValue = Math.ceil(this.vtsValue);

    this.updateStarStyle();
  }

  onFocus(e: FocusEvent): void {
    this.isFocused = true;
    this.vtsOnFocus.emit(e);
  }

  onBlur(e: FocusEvent): void {
    this.isFocused = false;
    this.vtsOnBlur.emit(e);
  }

  focus(): void {
    this.ulElement!.nativeElement.focus();
  }

  blur(): void {
    this.ulElement!.nativeElement.blur();
  }

  onKeyDown(e: KeyboardEvent): void {
    const oldVal = this.vtsValue;

    if (e.keyCode === RIGHT_ARROW && this.vtsValue < this.vtsCount) {
      this.vtsValue += this.vtsAllowHalf ? 0.5 : 1;
    } else if (e.keyCode === LEFT_ARROW && this.vtsValue > 0) {
      this.vtsValue -= this.vtsAllowHalf ? 0.5 : 1;
    }

    if (oldVal !== this.vtsValue) {
      this.onChange(this.vtsValue);
      this.vtsOnKeyDown.emit(e);
      this.updateStarStyle();
      this.cdr.markForCheck();
    }
  }

  private updateStarArray(): void {
    this.starArray = Array(this.vtsCount)
      .fill(0)
      .map((_, i) => i);

    this.updateStarStyle();
  }

  private updateStarStyle(): void {
    this.starStyleArray = this.starArray.map(i => {
      const prefix = 'vts-rate-star';
      const value = i + 1;
      return {
        [`${prefix}-full`]: value < this.hoverValue || (!this.hasHalf && value === this.hoverValue),
        [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
        [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
        [`${prefix}-zero`]: value > this.hoverValue,
        [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
      };
    });
  }

  writeValue(value: number | null): void {
    this.vtsValue = value || 0;
    this.updateStarArray();
    this.cdr.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
}
