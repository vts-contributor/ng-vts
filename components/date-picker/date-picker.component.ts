/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
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
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { CandyDate, cloneDate, CompatibleValue } from '@ui-vts/ng-vts/core/time';
import {
  BooleanInput,
  FunctionProp,
  VtsSafeAny,
  OnChangeType,
  OnTouchedType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean, toBoolean, valueFunctionProp } from '@ui-vts/ng-vts/core/util';
import {
  DateHelperService,
  VtsDatePickerI18nInterface,
  VtsDatePickerLangI18nInterface,
  VtsI18nService
} from '@ui-vts/ng-vts/i18n';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { Placement, VtsPickerComponent } from './picker.component';
import {
  CompatibleDate,
  DisabledTimeFn,
  VtsDateMode,
  PresetRanges,
  SupportTimeOptions
} from './standard-types';
import { AnimationDuration } from '@ui-vts/ng-vts/core/animation';

const POPUP_STYLE_PATCH = { position: 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'datePicker';

export type VtsDatePickerSizeType = 'xl' | 'lg' | 'md' | 'sm';
export type VtsPlacement = Placement;

/**
 * The base picker for all common APIs
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector:
    'vts-date-picker,vts-week-picker,vts-month-picker,vts-year-picker,vts-range-picker,vts-range-picker-single',
  exportAs: 'vtsDatePicker',
  template: `
    <div
      vts-picker
      style="display: inherit; align-items: center; width: 100%;"
      [id]="vtsId"
      [isRange]="isRange"
      [isRangeSingleMode]="isRangeSingleMode"
      [open]="vtsOpen"
      [dir]="dir"
      [separator]="vtsSeparator"
      [disabled]="vtsDisabled"
      [inputReadOnly]="vtsInputReadOnly"
      [inline]="vtsInline"
      [format]="vtsFormat"
      [allowClear]="vtsAllowClear"
      [autoFocus]="vtsAutoFocus"
      [placeholder]="vtsPlaceHolder"
      [dropdownClassName]="vtsDropdownClassName"
      [class.vts-picker-dropdown-rtl]="dir === 'rtl'"
      [popupStyle]="vtsPopupStyle"
      [noAnimation]="!!noAnimation?.vtsNoAnimation"
      [suffixIcon]="vtsSuffixIcon"
      [hasBackdrop]="vtsBackdrop"
      (openChange)="onOpenChange($event)"
      (focusChange)="onFocusChange($event)"
      [vtsId]="vtsId"
      [vtsPlacement]="vtsPlacement"
    >
      <date-range-popup
        [isRange]="isRange"
        [inline]="vtsInline"
        [defaultPickerValue]="vtsDefaultPickerValue"
        [showWeek]="vtsMode === 'week'"
        [panelMode]="panelMode"
        (panelModeChange)="onPanelModeChange($event)"
        (calendarChange)="onCalendarChange($event)"
        [locale]="vtsLocale?.lang!"
        [showToday]="vtsMode === 'date' && vtsShowToday && !isRange"
        [showNow]="vtsMode === 'date' && vtsShowNow && !isRange"
        [showTime]="vtsShowTime && !isRange"
        [dateRender]="vtsDateRender"
        [disabledDate]="vtsDisabledDate"
        [disabledTime]="vtsDisabledTime"
        [extraFooter]="extraFooter"
        [ranges]="vtsRanges"
        [dir]="dir"
        (resultOk)="onResultOk()"
        [opened]="panelOpen"
      ></date-range-popup>
    </div>
  `,
  host: {
    '[class.vts-picker-range]': `isRange`,
    '[class.vts-picker-range-single]': `isRangeSingleMode`,
    '[class.vts-picker-panel-open]': `panelOpen`,
    '[class.vts-picker-xl]': `vtsSize === 'xl'`,
    '[class.vts-picker-lg]': `vtsSize === 'lg'`,
    '[class.vts-picker-md]': `vtsSize === 'md'`,
    '[class.vts-picker-sm]': `vtsSize === 'sm'`,
    '[class.vts-picker-disabled]': `vtsDisabled`,
    '[class.vts-picker-rtl]': `dir === 'rtl'`,
    '[class.vts-picker-borderless]': `vtsBorderless`,
    '[class.vts-picker-inline]': `vtsInline`,
    '(click)': 'picker.onClickInputBox($event)'
  },
  styles: ['.vts-picker { width: 100%; }'],
  providers: [
    DatePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => VtsDatePickerComponent)
    }
  ]
})
export class VtsDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsAllowClear: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsBorderless: BooleanInput;
  static ngAcceptInputType_vtsInputReadOnly: BooleanInput;
  static ngAcceptInputType_vtsInline: BooleanInput;
  static ngAcceptInputType_vtsOpen: BooleanInput;
  static ngAcceptInputType_vtsShowToday: BooleanInput;
  static ngAcceptInputType_vtsShowNow: BooleanInput;
  static ngAcceptInputType_vtsMode:
    | VtsDateMode
    | VtsDateMode[]
    | string
    | string[]
    | null
    | undefined;
  static ngAcceptInputType_vtsShowTime: BooleanInput | SupportTimeOptions | null | undefined;

  isRange: boolean = false; // Indicate whether the value is a range value
  isRangeSingleMode: boolean = false;
  focused: boolean = false;
  extraFooter?: TemplateRef<VtsSafeAny> | string;
  dir: Direction = 'ltr';
  panelOpen: Boolean = false;

  public panelMode: VtsDateMode | VtsDateMode[] = 'date';
  private destroyed$: Subject<void> = new Subject();
  private isCustomPlaceHolder: boolean = true;
  private isCustomFormat: boolean = false;
  private showTime: SupportTimeOptions | boolean = false;
  private disabledTime?: DisabledTimeFn;
  private disabledDate?: (d: Date) => boolean;
  private openChangeSubject = new BehaviorSubject<boolean>(false);

  // --- Common API
  @Input() @InputBoolean() vtsAllowClear: boolean = true;
  @Input() @InputBoolean() vtsAutoFocus: boolean = false;
  @Input() @InputBoolean() set disabled(value: boolean) {
    this.vtsDisabled = value;
  }
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Input() @InputBoolean() vtsBorderless: boolean = false;
  @Input() @InputBoolean() vtsInputReadOnly: boolean = false;
  @Input() @InputBoolean() vtsInline: boolean = false;
  @Input() @InputBoolean() vtsOpen?: boolean;
  @Input()
  set vtsDisabledDate(value: ((d: Date) => boolean) | undefined) {
    // this.disabledDate = this.vtsMode == 'date' ? value : undefined;
    this.disabledDate = value;
  }
  get vtsDisabledDate() {
    return this.disabledDate;
  }

  @Input() vtsLocale!: VtsDatePickerI18nInterface;
  @Input() vtsPlaceHolder: string | string[] = ''; // isCustomPlaceHolder force to true
  @Input() vtsPopupStyle: object = POPUP_STYLE_PATCH;
  @Input() vtsDropdownClassName?: string;
  @Input() vtsSize: VtsDatePickerSizeType = 'md';
  @Input() vtsFormat!: string;
  @Input() vtsDateRender?:
    | TemplateRef<VtsSafeAny>
    | string
    | FunctionProp<TemplateRef<Date> | string>;
  @Input()
  set vtsDisabledTime(value: DisabledTimeFn | undefined) {
    // this.disabledTime = this.vtsMode == 'date' ? value : undefined;
    this.disabledTime = value;
  }
  get vtsDisabledTime() {
    return this.disabledTime;
  }
  @Input() vtsRenderExtraFooter?:
    | TemplateRef<VtsSafeAny>
    | string
    | FunctionProp<TemplateRef<VtsSafeAny> | string>;
  @Input() @InputBoolean() vtsShowToday: boolean = false;
  @Input() vtsMode: VtsDateMode = 'date';
  @Input() @InputBoolean() vtsShowNow: boolean = false;
  @Input() vtsRanges?: PresetRanges;
  @Input() vtsDefaultPickerValue: CompatibleDate | null = null;
  @Input() @WithConfig() vtsSeparator?: string = undefined;
  @Input() @WithConfig() vtsSuffixIcon: string | TemplateRef<VtsSafeAny> = 'suffix:vts-picker';
  @Input() @WithConfig() vtsBackdrop = false;
  @Input() vtsId: string | null = null;
  @Input() vtsPlacement: VtsPlacement = 'bottomLeft';

  // TODO(@wenqi73) The PanelMode need named for each pickers and export
  @Output() readonly vtsOnPanelChange = new EventEmitter<
    VtsDateMode | VtsDateMode[] | string | string[]
  >();
  @Output() readonly vtsOnCalendarChange = new EventEmitter<Array<Date | null>>();
  @Output() readonly vtsOnOk = new EventEmitter<CompatibleDate | null>();
  @Output() readonly vtsOpenChange = new EventEmitter<boolean>();

  @ViewChild(VtsPickerComponent, { static: true }) picker!: VtsPickerComponent;

  @Input() get vtsShowTime(): SupportTimeOptions | boolean {
    return this.showTime;
  }

  set vtsShowTime(value: SupportTimeOptions | boolean) {
    this.showTime = typeof value === 'object' ? value : toBoolean(value);
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    public datePickerService: DatePickerService,
    protected i18n: VtsI18nService,
    protected cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    protected dateHelper: DateHelperService,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-picker');
  }

  ngOnInit(): void {
    // Subscribe the every locale change if the vtsLocale is not handled by user
    if (!this.vtsLocale) {
      this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.setLocale());
    }

    // Default value
    this.datePickerService.isRange = this.isRange;
    this.datePickerService.isRangeSingleMode = this.isRangeSingleMode;
    this.datePickerService.initValue();
    this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe(_ => {
      const value = this.datePickerService.value;
      this.datePickerService.initialValue = cloneDate(value);
      if (this.isRange) {
        const vAsRange = value as CandyDate[];
        if (vAsRange.length) {
          this.onChangeFn([vAsRange[0]?.nativeDate ?? null, vAsRange[1]?.nativeDate ?? null]);
        } else {
          this.onChangeFn([]);
        }
      } else {
        if (value) {
          this.onChangeFn((value as CandyDate).nativeDate);
        } else {
          this.onChangeFn(null);
        }
      }
      this.onTouchedFn();
      // When value emitted, overlay will be closed
      this.close();
    });

    this.setModeAndFormat();

    this.directionality.change
      ?.pipe(takeUntil(this.destroyed$))
      .subscribe((direction: Direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
    this.dir = this.directionality.value;

    this.openChangeSubject
      .pipe(debounceTime(0), takeUntil(this.destroyed$))
      .pipe(
        switchMap(open => {
          return of(open).pipe(
            delay(open ? 0 : Number(AnimationDuration.BASE.replace('s', '')) * 1000)
          );
        })
      )
      .subscribe(open => {
        this.panelOpen = open;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsPopupStyle) {
      // Always assign the popup style patch
      this.vtsPopupStyle = this.vtsPopupStyle
        ? { ...this.vtsPopupStyle, ...POPUP_STYLE_PATCH }
        : POPUP_STYLE_PATCH;
    }

    // Mark as customized placeholder by user once vtsPlaceHolder assigned at the first time
    // if (changes.vtsPlaceHolder?.currentValue) {
    //   this.isCustomPlaceHolder = true;
    // }

    if (changes.vtsFormat?.currentValue) {
      this.isCustomFormat = true;
    }

    if (changes.vtsLocale) {
      // The vtsLocale is currently handled by user
      this.setDefaultPlaceHolder();
    }

    if (changes.vtsRenderExtraFooter) {
      this.extraFooter = valueFunctionProp(this.vtsRenderExtraFooter!);
    }

    if (changes.vtsMode) {
      this.setDefaultPlaceHolder();
      this.setModeAndFormat();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setModeAndFormat(): void {
    const inputFormats: { [key in VtsDateMode]?: string } = {
      year: 'yyyy',
      month: 'MMM yyyy',
      week: 'ww-yyyy', // Format for week
      date: this.vtsShowTime ? 'dd/MM/yyyy HH:mm:ss' : 'dd/MM/yyyy'
    };

    if (!this.vtsMode) {
      this.vtsMode = 'date';
    }

    this.panelMode = this.isRange ? [this.vtsMode, this.vtsMode] : this.vtsMode;

    // Default format when it's empty
    if (!this.isCustomFormat) {
      this.vtsFormat = inputFormats[this.vtsMode as VtsDateMode]!;
    }
  }

  /**
   * Triggered when overlayOpen changes (different with realOpenState)
   * @param open The overlayOpen in picker component
   */
  onOpenChange(open: boolean): void {
    this.openChangeSubject.next(open);
    this.vtsOpenChange.emit(open);
  }

  public open(): void {
    this.picker.showOverlay();
  }

  public close(): void {
    this.picker.hideOverlay();
  }

  // ------------------------------------------------------------------------
  // | Control value accessor implements
  // ------------------------------------------------------------------------

  // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
  onChangeFn: OnChangeType = () => void 0;
  onTouchedFn: OnTouchedType = () => void 0;

  writeValue(value: CompatibleDate): void {
    this.setValue(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  // ------------------------------------------------------------------------
  // | Internal methods
  // ------------------------------------------------------------------------

  // Reload locale from i18n with side effects
  private setLocale(): void {
    this.vtsLocale = this.i18n.getLocaleData('DatePicker', {});
    this.setDefaultPlaceHolder();
    this.cdr.markForCheck();
  }

  private setDefaultPlaceHolder(): void {
    if (!this.isCustomPlaceHolder && this.vtsLocale) {
      const defaultPlaceholder: { [key in VtsDateMode]?: string } = {
        year: this.getPropertyOfLocale('yearPlaceholder'),
        month: this.getPropertyOfLocale('monthPlaceholder'),
        week: this.getPropertyOfLocale('weekPlaceholder'),
        date: this.getPropertyOfLocale('placeholder')
      };

      const defaultRangePlaceholder: { [key in VtsDateMode]?: string[] } = {
        year: this.getPropertyOfLocale('rangeYearPlaceholder'),
        month: this.getPropertyOfLocale('rangeMonthPlaceholder'),
        week: this.getPropertyOfLocale('rangeWeekPlaceholder'),
        date: this.getPropertyOfLocale('rangePlaceholder')
      };

      this.vtsPlaceHolder = this.isRange
        ? defaultRangePlaceholder[this.vtsMode as VtsDateMode]!
        : defaultPlaceholder[this.vtsMode as VtsDateMode]!;
    }
  }

  private getPropertyOfLocale<T extends keyof VtsDatePickerLangI18nInterface>(
    type: T
  ): VtsDatePickerLangI18nInterface[T] {
    return this.vtsLocale.lang[type] || this.i18n.getLocaleData(`DatePicker.lang.${type}`);
  }

  // Safe way of setting value with default
  private setValue(value: CompatibleDate): void {
    const newValue: CompatibleValue = this.datePickerService.makeValue(value);
    this.datePickerService.setValue(newValue);
    this.datePickerService.initialValue = newValue;
  }

  onFocusChange(value: boolean): void {
    this.focused = value;
    // TODO: avoid autoFocus cause change after checked error
    if (this.focused) {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-picker-focused');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-picker-focused');
    }
  }

  onPanelModeChange(panelMode: VtsDateMode | VtsDateMode[]): void {
    this.vtsOnPanelChange.emit(panelMode);
  }

  // Emit vtsOnCalendarChange when select date by vts-range-picker
  onCalendarChange(value: CompatibleValue): void {
    if (this.isRange && Array.isArray(value)) {
      const rangeValue = value.filter(x => x instanceof CandyDate).map(x => x!.nativeDate);
      this.vtsOnCalendarChange.emit(rangeValue);
    }
  }

  onResultOk(): void {
    if (this.isRange) {
      const value = this.datePickerService.value as CandyDate[];
      if (value.length) {
        this.vtsOnOk.emit([value[0]?.nativeDate || null, value[1]?.nativeDate || null]);
      } else {
        this.vtsOnOk.emit([]);
      }
    } else {
      if (this.datePickerService.value) {
        this.vtsOnOk.emit((this.datePickerService.value as CandyDate).nativeDate);
      } else {
        this.vtsOnOk.emit(null);
      }
    }
  }
}
