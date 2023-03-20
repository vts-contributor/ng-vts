/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
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
import { isValid } from 'date-fns';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { warn } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, isNil } from '@ui-vts/ng-vts/core/util';
import { DateHelperService, VtsI18nInterface, VtsI18nService } from '@ui-vts/ng-vts/i18n';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'timePicker';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-time-picker',
  exportAs: 'vtsTimePicker',
  template: `
    <div class="vts-picker-input">
      <input
        #inputElement
        [attr.id]="vtsId"
        type="text"
        [size]="inputSize"
        [placeholder]="vtsPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="vtsDisabled"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
        [readonly]="vtsInputReadOnly"
      />

      <span
        *ngIf="vtsAllowEmpty && !vtsDisabled && value"
        class="vts-picker-clear"
        (click)="onClickClearBtn($event)"
      >
        <i
          vts-icon
          vtsType="Close"
          [attr.aria-label]="vtsClearText"
          [attr.title]="vtsClearText"
        ></i>
      </span>
      <span class="vts-picker-suffix">
        <ng-container *vtsStringTemplateOutlet="vtsSuffixIcon; let suffixIcon">
          <i vts-icon [vtsType]="suffixIcon"></i>
        </ng-container>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="vtsBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="vtsOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.vts-picker-dropdown'"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div
        [@slideMotion]="'enter'"
        (@slideMotion.done)="onAnimateEnd()"
        class="vts-picker-dropdown"
        style="position: relative"
      >
        <div class="vts-picker-panel-container">
          <div tabindex="-1" class="vts-picker-panel">
            <vts-time-picker-panel
              [ngClass]="vtsDropdownClassName"
              [format]="vtsFormat"
              [vtsHourStep]="vtsHourStep"
              [vtsMinuteStep]="vtsMinuteStep"
              [vtsSecondStep]="vtsSecondStep"
              [vtsDisabledHours]="vtsDisabledHours"
              [vtsDisabledMinutes]="vtsDisabledMinutes"
              [vtsDisabledSeconds]="vtsDisabledSeconds"
              [vtsPlaceHolder]="vtsPlaceHolder || (i18nPlaceHolder$ | async)"
              [vtsHideDisabledOptions]="vtsHideDisabledOptions"
              [vtsUse12Hours]="vtsUse12Hours"
              [vtsDefaultOpenValue]="vtsDefaultOpenValue"
              [vtsAddOn]="vtsAddOn"
              [vtsClearText]="vtsClearText"
              [vtsNowText]="vtsNowText"
              [vtsOkText]="vtsOkText"
              [vtsAllowEmpty]="vtsAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="setCurrentValueAndClose()"
            ></vts-time-picker-panel>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[class.vts-picker-xl]': `vtsSize === 'xl'`,
    '[class.vts-picker-lg]': `vtsSize === 'lg'`,
    '[class.vts-picker-md]': `vtsSize === 'md'`,
    '[class.vts-picker-sm]': `vtsSize === 'sm'`,
    '[class.vts-picker-disabled]': `vtsDisabled`,
    '[class.vts-picker-focused]': `focused`,
    '[class.vts-picker-rtl]': `dir === 'rtl'`,
    '(click)': 'open()'
  },
  styles: ['.vts-picker { width: 100%; }'],
  animations: [slideMotion],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: VtsTimePickerComponent,
      multi: true
    }
  ]
})
export class VtsTimePickerComponent
  implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsUse12Hours: BooleanInput;
  static ngAcceptInputType_vtsHideDisabledOptions: BooleanInput;
  static ngAcceptInputType_vtsAllowEmpty: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_vtsInputReadOnly: BooleanInput;

  private _onChange?: (value: Date | null) => void;
  private _onTouched?: () => void;
  private destroy$ = new Subject<void>();
  isInit = false;
  focused = false;
  inputValue: string = '';
  value: Date | null = null;
  preValue: Date | null = null;
  origin!: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false })
  cdkConnectedOverlay?: CdkConnectedOverlay;
  inputSize?: number;
  i18nPlaceHolder$: Observable<string | undefined> = of(undefined);
  overlayPositions: ConnectionPositionPair[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 3
    },
    {
      offsetY: -3,
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    },
    {
      offsetY: 3,
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    },
    {
      offsetY: -3,
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }
  ];
  dir: Direction = 'ltr';

  @ViewChild('inputElement', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;
  @Input() vtsId: string | null = null;
  @Input() vtsSize: string | null = 'md';
  @Input() @WithConfig() vtsHourStep: number = 1;
  @Input() @WithConfig() vtsMinuteStep: number = 1;
  @Input() @WithConfig() vtsSecondStep: number = 1;
  @Input() @WithConfig() vtsClearText: string = 'clear';
  @Input() @WithConfig() vtsNowText: string = 'Now';
  @Input() @WithConfig() vtsOkText: string = '';
  @Input() @WithConfig() vtsDropdownClassName: string = '';
  @Input() vtsPlaceHolder = '';
  @Input() vtsAddOn?: TemplateRef<void>;
  @Input() vtsDefaultOpenValue?: Date;
  @Input() vtsDisabledHours?: () => number[];
  @Input() vtsDisabledMinutes?: (hour: number) => number[];
  @Input() vtsDisabledSeconds?: (hour: number, minute: number) => number[];
  @Input() @WithConfig() vtsFormat: string = 'HH:mm:ss';
  @Input() vtsOpen = false;
  @Input() @WithConfig() @InputBoolean() vtsUse12Hours: boolean = false;
  @Input() @WithConfig() vtsSuffixIcon: string | TemplateRef<VtsSafeAny> = 'Time';

  @Output() readonly vtsOpenChange = new EventEmitter<boolean>();

  @Input() @InputBoolean() vtsHideDisabledOptions = false;
  @Input() @WithConfig() @InputBoolean() vtsAllowEmpty: boolean = true;
  @Input() @InputBoolean() set disabled(value: boolean) {
    this.vtsDisabled = value;
  }
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsAutoFocus = false;
  @Input() @WithConfig() vtsBackdrop = false;
  @Input() @InputBoolean() vtsInputReadOnly: boolean = false;

  emitValue(value: Date | null): void {
    this.setValue(value, true);

    if (this._onChange) {
      this._onChange(this.value);
    }

    if (this._onTouched) {
      this._onTouched();
    }
  }

  setValue(value: Date | null, syncPreValue: boolean = false): void {
    if (syncPreValue) {
      this.preValue = isValid(value) ? new Date(value!) : null;
    }
    this.value = isValid(value) ? new Date(value!) : null;
    this.inputValue = this.dateHelper.format(value, this.vtsFormat);
    this.cdr.markForCheck();
  }

  open(): void {
    if (this.vtsDisabled || this.vtsOpen) {
      return;
    }
    this.focus();
    this.vtsOpen = true;
    this.vtsOpenChange.emit(this.vtsOpen);
  }

  close(): void {
    this.vtsOpen = false;
    this.cdr.markForCheck();
    this.vtsOpenChange.emit(this.vtsOpen);
  }

  updateAutoFocus(): void {
    if (this.isInit && !this.vtsDisabled) {
      if (this.vtsAutoFocus) {
        this.renderer.setAttribute(this.inputRef.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.inputRef.nativeElement, 'autofocus');
      }
    }
  }

  onClickClearBtn(event: MouseEvent): void {
    event.stopPropagation();
    this.emitValue(null);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.setCurrentValueAndClose();
    }
  }

  onFocus(value: boolean): void {
    this.focused = value;
  }

  focus(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }

  blur(): void {
    if (this.inputRef.nativeElement) {
      this.inputRef.nativeElement.blur();
    }
  }

  onKeyupEsc(): void {
    this.setValue(this.preValue);
  }

  onKeyupEnter(): void {
    if (this.vtsOpen && isValid(this.value)) {
      this.setCurrentValueAndClose();
    } else if (!this.vtsOpen) {
      this.open();
    }
  }

  onInputChange(str: string): void {
    if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
      this.open();
      this.parseTimeString(str);
    }
  }

  onPanelValueChange(value: Date): void {
    this.setValue(value);
    this.focus();
  }

  setCurrentValueAndClose(): void {
    this.emitValue(this.value);
    this.close();
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    protected i18n: VtsI18nService,
    private element: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dateHelper: DateHelperService,
    private platform: Platform,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-picker');
  }

  ngOnInit(): void {
    this.inputSize = Math.max(8, this.vtsFormat.length) + 2;
    this.origin = new CdkOverlayOrigin(this.element);

    this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(
      map((vtsLocale: VtsI18nInterface) => vtsLocale.TimePicker.placeholder)
    );

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsUse12Hours, vtsFormat, vtsDisabled, vtsAutoFocus } = changes;
    if (vtsUse12Hours && !vtsUse12Hours.previousValue && vtsUse12Hours.currentValue && !vtsFormat) {
      this.vtsFormat = 'h:mm:ss a';
    }
    if (vtsDisabled) {
      const value = vtsDisabled.currentValue;
      const input = this.inputRef.nativeElement as HTMLInputElement;
      if (value) {
        this.renderer.setAttribute(input, 'disabled', '');
      } else {
        this.renderer.removeAttribute(input, 'disabled');
      }
    }
    if (vtsAutoFocus) {
      this.updateAutoFocus();
    }
  }

  parseTimeString(str: string): void {
    const value = this.dateHelper.parseTime(str, this.vtsFormat) || null;
    if (isValid(value)) {
      this.value = value;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.updateAutoFocus();
  }

  writeValue(time: Date | null | undefined): void {
    let result: Date | null;

    if (time instanceof Date) {
      result = time;
    } else if (isNil(time)) {
      result = null;
    } else {
      warn('Non-Date type is not recommended for time-picker, use "Date" type.');
      result = new Date(time);
    }

    this.setValue(result, true);
  }

  registerOnChange(fn: (time: Date | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  // Handle wrong position on open
  onAnimateEnd() {
    this.cdkConnectedOverlay?.overlayRef?.updatePosition();
  }
}
