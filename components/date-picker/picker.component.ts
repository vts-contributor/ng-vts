/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsResizeObserver } from '@ui-vts/ng-vts/cdk/resize-observer';

import { Direction } from '@angular/cdk/bidi';
import { CandyDate, CompatibleValue, wrongSortOrder } from '@ui-vts/ng-vts/core/time';
import { NgStyleInterface, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { DateHelperService } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { DateRangePopupComponent } from './date-range-popup.component';
import { RangePartType } from './standard-types';
import { PREFIX_CLASS } from './util';
import { VtsPlacement } from './date-picker.component';
import {
  DATE_PICKER_POSITION_MAP,
  DEFAULT_DATE_PICKER_POSITIONS
} from '@ui-vts/ng-vts/core/overlay';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[vts-picker]',
  exportAs: 'vtsPicker',
  template: `
    <ng-container *ngIf="!inline; else inlineMode">
      <!-- Content of single picker -->
      <div *ngIf="!isRange" class="{{ prefixCls }}-input">
        <input
          #pickerInput
          [attr.id]="vtsId"
          [class.vts-input-disabled]="disabled"
          [disabled]="disabled"
          [readOnly]="inputReadOnly"
          [(ngModel)]="inputValue"
          placeholder="{{ getPlaceholder() }}"
          [size]="inputSize"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (ngModelChange)="onInputChange($event)"
          (keyup.enter)="onKeyupEnter($event)"
        />
        <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
      </div>

      <!-- Content of range picker (unused) -->
      <ng-container *ngIf="isRange && !isRangeSingleMode">
        <div class="{{ prefixCls }}-input">
          <ng-container
            *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }"
          ></ng-container>
        </div>
        <div #separatorElement class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator">
            <ng-container *ngIf="separator; else defaultSeparator">
              {{ separator }}
            </ng-container>
          </span>
          <ng-template #defaultSeparator>
            <i vts-icon vtsType="ArrowRightAltDoutone"></i>
          </ng-template>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container
            *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }"
          ></ng-container>
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
      </ng-container>

      <!-- Content of range single picker -->
      <div *ngIf="isRange && isRangeSingleMode" class="{{ prefixCls }}-input">
        <input
          #rangePickerInput
          [attr.id]="vtsId"
          [class.vts-input-disabled]="disabled"
          [disabled]="disabled"
          [readOnly]="inputReadOnly"
          [(ngModel)]="inputValue"
          placeholder="{{ getPlaceholder() }}"
          [size]="inputSize"
          (focus)="onFocus($event, 'left')"
          (blur)="onBlur($event)"
          (ngModelChange)="onInputChange($event)"
          (keyup.enter)="onKeyupEnter($event)"
        />
        <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
      </div>
    </ng-container>

    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [disabled]="disabled"
        [readOnly]="inputReadOnly"
        [size]="inputSize"
        (click)="onClickInputBox($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [ngStyle]="activeBarStyle"></div>
      <span *ngIf="showClear()" class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
        <i vts-icon vtsType="Close"></i>
      </span>
      <span class="{{ prefixCls }}-suffix">
        <ng-container *vtsStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i (click)="showOverlay()" vts-icon [vtsType]="suffixIcon"></i>
        </ng-container>
      </span>
    </ng-template>

    <ng-template #inlineMode>
      <div
        class="{{ prefixCls }}-dropdown {{ dropdownClassName }}"
        [class.vts-picker-dropdown-rtl]="dir === 'rtl'"
        [class.vts-picker-dropdown-placement-bottomLeft]="
          currentPositionY === 'bottom' && currentPositionX === 'start'
        "
        [class.vts-picker-dropdown-placement-topLeft]="
          currentPositionY === 'top' && currentPositionX === 'start'
        "
        [class.vts-picker-dropdown-placement-bottomRight]="
          currentPositionY === 'bottom' && currentPositionX === 'end'
        "
        [class.vts-picker-dropdown-placement-topRight]="
          currentPositionY === 'top' && currentPositionX === 'end'
        "
        [class.vts-picker-dropdown-range]="isRange"
        [class.vts-picker-active-left]="datePickerService.activeInput === 'left'"
        [class.vts-picker-active-right]="datePickerService.activeInput === 'right'"
        [ngStyle]="popupStyle"
      >
        <!-- Compatible for overlay that not support offset dynamically and immediately -->
        <ng-content></ng-content>
      </div>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.vts-picker-wrapper'"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
      (overlayOutsideClick)="onClickOutside($event)"
    >
      <div
        class="vts-picker-wrapper"
        [vtsNoAnimation]="noAnimation"
        [@slideMotion]="'enter'"
        style="position: relative;"
      >
        <ng-container *ngTemplateOutlet="inlineMode"></ng-container>
      </div>
    </ng-template>
  `,
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsPickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() noAnimation: boolean = false;
  @Input() isRange: boolean = false;
  @Input() isRangeSingleMode: boolean = false;
  @Input() open: boolean | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() inputReadOnly: boolean = false;
  @Input() inline: boolean = false;
  @Input() placeholder!: string | string[];
  @Input() allowClear?: boolean;
  @Input() autoFocus?: boolean;
  @Input() format!: string;
  @Input() separator?: string;
  @Input() popupStyle: NgStyleInterface | null = null;
  @Input() dropdownClassName?: string;
  @Input() suffixIcon?: string | TemplateRef<VtsSafeAny>;
  @Input() dir: Direction = 'ltr';
  @Input() vtsId: string | null = null;
  @Input() hasBackdrop = false;
  @Input() vtsPlacement: VtsPlacement = 'bottomLeft';

  @Output() readonly focusChange = new EventEmitter<boolean>();
  @Output() readonly valueChange = new EventEmitter<CandyDate | CandyDate[] | null>();
  @Output() readonly openChange = new EventEmitter<boolean>(); // Emitted when overlay's open state change

  @ViewChild(CdkConnectedOverlay, { static: false })
  cdkConnectedOverlay?: CdkConnectedOverlay;
  @ViewChild('separatorElement', { static: false })
  separatorElement?: ElementRef;
  @ViewChild('pickerInput', { static: false })
  pickerInput?: ElementRef<HTMLInputElement>;
  @ViewChildren('rangePickerInput') rangePickerInputs?: QueryList<ElementRef<HTMLInputElement>>;
  @ContentChild(DateRangePopupComponent) panel!: DateRangePopupComponent;

  origin: CdkOverlayOrigin;
  document: Document;
  inputSize: number = 12;
  inputWidth?: number;
  destroy$ = new Subject();
  prefixCls = PREFIX_CLASS;
  inputValue!: VtsSafeAny;
  activeBarStyle: object = {};
  overlayOpen: boolean = false; // Available when "open"=undefined
  overlayPositions: ConnectionPositionPair[] = [...DEFAULT_DATE_PICKER_POSITIONS];
  currentPositionX: HorizontalConnectionPos = 'start';
  currentPositionY: VerticalConnectionPos = 'bottom';

  get realOpenState(): boolean {
    // The value that really decide the open state of overlay
    return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
  }

  constructor(
    private elementRef: ElementRef,
    private dateHelper: DateHelperService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private vtsResizeObserver: VtsResizeObserver,
    public datePickerService: DatePickerService,
    @Inject(DOCUMENT) doc: VtsSafeAny
  ) {
    this.document = doc;
    this.origin = new CdkOverlayOrigin(this.elementRef);
  }

  ngOnInit(): void {
    this.inputValue = this.isRange ? ['', ''] : '';
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateInputValue();
    });
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.focus();
    }

    if (this.isRange && this.platform.isBrowser) {
      this.vtsResizeObserver
        .observe(this.elementRef)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateInputWidthAndArrowLeft();
        });
    }

    this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe(partType => {
      if (partType) {
        this.datePickerService.activeInput = partType;
      }
      this.focus();
      this.updateInputWidthAndArrowLeft();
      this.panel?.updateActiveDate();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.format?.currentValue !== changes.format?.previousValue) {
      this.inputSize = Math.max(10, this.format.length) + 2;
      this.updateInputValue();
    }

    if (changes.vtsPlacement) {
      this.setPlacement(this.vtsPlacement);
    }
  }

  updateInputWidthAndArrowLeft(): void {
    this.inputWidth = this.rangePickerInputs?.first?.nativeElement.offsetWidth || 0;

    const baseStyle = { position: 'absolute', width: `${this.inputWidth}px` };
    this.datePickerService.arrowLeft =
      this.datePickerService.activeInput === 'left'
        ? 0
        : this.inputWidth + this.separatorElement?.nativeElement.offsetWidth || 0;

    if (this.dir === 'rtl') {
      this.activeBarStyle = {
        ...baseStyle,
        right: `${this.datePickerService.arrowLeft}px`
      };
    } else {
      this.activeBarStyle = {
        ...baseStyle,
        left: `${this.datePickerService.arrowLeft}px`
      };
    }

    this.panel?.cdr.markForCheck();
    this.cdr.markForCheck();
  }

  getInput(partType?: RangePartType): HTMLInputElement | undefined {
    if (this.inline) {
      return undefined;
    }
    return this.isRange
      ? partType === 'left'
        ? this.rangePickerInputs?.first.nativeElement
        : this.rangePickerInputs?.last.nativeElement
      : this.pickerInput!.nativeElement;
  }

  focus(): void {
    const activeInputElement = this.getInput(this.datePickerService.activeInput);
    if (this.document.activeElement !== activeInputElement) {
      activeInputElement?.focus();
    }
  }

  onFocus(event: FocusEvent, partType?: RangePartType): void {
    event.preventDefault();
    this.focusChange.emit(true);
    if (partType) {
      this.datePickerService.inputPartChange$.next(partType);
    }
  }

  onBlur(event: FocusEvent): void {
    event.preventDefault();
    this.focusChange.emit(false);
  }

  // Show overlay content
  showOverlay(): void {
    if (this.inline) {
      return;
    }
    if (!this.realOpenState && !this.disabled) {
      this.updateInputWidthAndArrowLeft();
      this.overlayOpen = true;
      this.focus();
      this.panel.init();
      this.openChange.emit(true);
      this.cdr.markForCheck();
    }
  }

  hideOverlay(): void {
    if (this.inline) {
      return;
    }
    if (this.realOpenState) {
      this.overlayOpen = false;
      this.openChange.emit(false);
    }
  }

  showClear(): boolean {
    return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && !!this.allowClear;
  }

  onClickInputBox(event: MouseEvent): void {
    event.stopPropagation();
    this.focus();
    // if (!this.isOpenHandledByUser()) {
    //   this.showOverlay();
    // }
  }

  onClickOutside(event: MouseEvent): void {
    if (this.elementRef.nativeElement.contains(event.target)) {
      return;
    }

    if (this.panel.isAllowed(this.datePickerService.value!, true)) {
      if (
        Array.isArray(this.datePickerService.value) &&
        wrongSortOrder(this.datePickerService.value)
      ) {
        const index = this.datePickerService.getActiveIndex(this.datePickerService.activeInput);
        const value = this.datePickerService.value[index];
        this.panel.changeValueFromSelect(value!, true);
        return;
      }
      this.updateInputValue();
      this.datePickerService.emitValue$.next();
    } else {
      this.datePickerService.setValue(this.datePickerService.initialValue!);
      this.hideOverlay();
    }
  }

  close(): void {
    this.hideOverlay();
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE) {
      this.datePickerService.setValue(this.datePickerService.initialValue!);
    }
  }

  // NOTE: A issue here, the first time position change, the animation will not be triggered.
  // Because the overlay's "positionChange" event is emitted after the content's full shown up.
  // All other components like "vts-dropdown" which depends on overlay also has the same issue.
  // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.currentPositionX = position.connectionPair.originX;
    this.currentPositionY = position.connectionPair.originY;
    this.cdr.detectChanges(); // Take side-effects to position styles
  }

  onClickClear(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.datePickerService.setValue(this.isRange ? [] : null);
    this.datePickerService.emitValue$.next();
  }

  updateInputValue(): void {
    const newValue = this.datePickerService.value;
    if (this.isRange) {
      if (this.datePickerService.isRangeSingleMode) {
        this.inputValue = newValue
          ? (newValue as CandyDate[]).map(v => this.formatValue(v)).join(' - ')
          : ['', ''];
      } else {
        this.inputValue = newValue
          ? (newValue as CandyDate[]).map(v => this.formatValue(v))
          : ['', ''];
      }
    } else {
      this.inputValue = this.formatValue(newValue as CandyDate);
    }
    this.cdr.markForCheck();
  }

  formatValue(value: CandyDate): string {
    return this.dateHelper.format(value && (value as CandyDate).nativeDate, this.format);
  }

  onInputChange(value: string, isEnter: boolean = false): void {
    /**
     * in IE11 focus/blur will trigger ngModelChange if has placeholder
     * so we forbidden IE11 to open panel through input change
     */
    if (
      !this.platform.TRIDENT &&
      this.document.activeElement === this.getInput(this.datePickerService.activeInput) &&
      !this.realOpenState
    ) {
      this.showOverlay();
    }

    const date = this.checkValidDate(value);
    if (date) {
      this.panel.changeValueFromSelect(date, isEnter);
    }
  }

  onKeyupEnter(event: Event): void {
    this.onInputChange((event.target as HTMLInputElement).value, true);
  }

  private checkValidDate(value: string): CandyDate | null {
    const date = new CandyDate(this.dateHelper.parseDate(value, this.format));

    if (!date.isValid() || value !== this.dateHelper.format(date.nativeDate, this.format)) {
      return null;
    }

    return date;
  }

  getPlaceholder(partType?: RangePartType): string {
    return this.isRange
      ? this.placeholder[this.datePickerService.getActiveIndex(partType!)]
      : (this.placeholder as string);
  }

  isEmptyValue(value: CompatibleValue): boolean {
    if (value === null) {
      return true;
    } else if (this.isRange) {
      return !value || !Array.isArray(value) || value.every(val => !val);
    } else {
      return !value;
    }
  }

  // Whether open state is permanently controlled by user himself
  isOpenHandledByUser(): boolean {
    return this.open !== undefined;
  }

  private setPlacement(placement: VtsPlacement): void {
    const position: ConnectionPositionPair = DATE_PICKER_POSITION_MAP[placement];
    this.overlayPositions = [position, ...DEFAULT_DATE_PICKER_POSITIONS];
    this.currentPositionX = position.originX;
    this.currentPositionY = position.originY;
  }
}
