/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
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
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, NumberInput } from '@ui-vts/ng-vts/core/types';
import {
  arraysEqual,
  ensureNumberInRange,
  getElementOffset,
  getPercent,
  getPrecision,
  InputBoolean,
  InputNumber,
  MouseTouchObserverConfig,
  silentEvent
} from '@ui-vts/ng-vts/core/util';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/operators';

import { VtsSliderHandleComponent } from './handle.component';
import { VtsSliderService } from './slider.service';

import {
  VtsExtendedMark,
  VtsMarks,
  VtsSliderHandler,
  VtsSliderShowTooltip,
  VtsSliderValue
} from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-slider',
  exportAs: 'vtsSlider',
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsSliderComponent),
      multi: true
    },
    VtsSliderService
  ],
  host: {
    '(keydown)': 'onKeyDown($event)',
    '[class.vts-slider-container]': 'true'
  },
  template: `
    <div
      #slider
      class="vts-slider"
      [class.vts-slider-rtl]="dir === 'rtl'"
      [class.vts-slider-disabled]="vtsDisabled"
      [class.vts-slider-vertical]="vtsVertical"
      [class.vts-slider-with-marks]="marksArray"
    >
      <div class="vts-slider-rail"></div>
      <span class="vts-slider-selected-value">{{ value }}</span>
      <span class="vts-slider-min-label">{{ vtsMin }}</span>
      <span class="vts-slider-max-label">{{ vtsMax }}</span>
      <vts-slider-track
        [vertical]="vtsVertical"
        [included]="vtsIncluded"
        [offset]="track.offset!"
        [length]="track.length!"
        [reverse]="vtsReverse"
        [dir]="dir"
      ></vts-slider-track>
      <vts-slider-step
        *ngIf="marksArray"
        [vertical]="vtsVertical"
        [min]="vtsMin"
        [max]="vtsMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="vtsIncluded"
        [reverse]="vtsReverse"
      ></vts-slider-step>
      <vts-slider-handle
        *ngFor="let handle of handles"
        [vertical]="vtsVertical"
        [reverse]="vtsReverse"
        [offset]="handle.offset!"
        [value]="handle.value!"
        [active]="handle.active"
        [tooltipFormatter]="vtsTipFormatter"
        [tooltipVisible]="vtsTooltipVisible"
        [tooltipPlacement]="vtsTooltipPlacement"
        [dir]="dir"
      ></vts-slider-handle>
      <vts-slider-marks
        *ngIf="marksArray"
        [vertical]="vtsVertical"
        [min]="vtsMin"
        [max]="vtsMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="vtsIncluded"
        [reverse]="vtsReverse"
      ></vts-slider-marks>
    </div>
  `
})
export class VtsSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsDots: BooleanInput;
  static ngAcceptInputType_vtsIncluded: BooleanInput;
  static ngAcceptInputType_vtsRange: BooleanInput;
  static ngAcceptInputType_vtsVertical: BooleanInput;
  static ngAcceptInputType_vtsMax: NumberInput;
  static ngAcceptInputType_vtsMin: NumberInput;
  static ngAcceptInputType_vtsStep: NumberInput;
  static ngAcceptInputType_vtsReverse: BooleanInput;

  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChildren(VtsSliderHandleComponent)
  handlerComponents!: QueryList<VtsSliderHandleComponent>;

  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsDots: boolean = false;
  @Input() @InputBoolean() vtsIncluded: boolean = true;
  @Input() @InputBoolean() vtsRange: boolean = false;
  @Input() @InputBoolean() vtsVertical: boolean = false;
  @Input() @InputBoolean() vtsReverse: boolean = false;
  @Input() vtsDefaultValue?: VtsSliderValue;
  @Input() vtsMarks: VtsMarks | null = null;
  @Input() @InputNumber() vtsMax = 100;
  @Input() @InputNumber() vtsMin = 0;
  @Input() @InputNumber() vtsStep = 1;
  @Input() vtsTooltipVisible: VtsSliderShowTooltip = 'default';
  @Input() vtsTooltipPlacement: string = 'top';
  @Input() vtsTipFormatter?: null | ((value: number) => string);

  @Output() readonly vtsOnAfterChange = new EventEmitter<VtsSliderValue>();

  value: VtsSliderValue | null = null;
  cacheSliderStart: number | null = null;
  cacheSliderLength: number | null = null;
  activeValueIndex: number | undefined = undefined; // Current activated handle's index ONLY for range=true
  track: { offset: null | number; length: null | number } = {
    offset: null,
    length: null
  }; // Track's offset and length
  handles: VtsSliderHandler[] = []; // Handles' offset
  marksArray: VtsExtendedMark[] | null = null; // "steps" in array type with more data & FILTER out the invalid mark
  bounds: { lower: VtsSliderValue | null; upper: VtsSliderValue | null } = {
    lower: null,
    upper: null
  }; // now for vts-slider-step
  dir: Direction = 'ltr';

  private dragStart$?: Observable<number>;
  private dragMove$?: Observable<number>;
  private dragEnd$?: Observable<Event>;
  private dragStart_?: Subscription | null;
  private dragMove_?: Subscription | null;
  private dragEnd_?: Subscription | null;
  private destroy$ = new Subject();

  constructor(
    private sliderService: VtsSliderService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    });

    this.handles = generateHandlers(this.vtsRange ? 2 : 1);
    this.marksArray = this.vtsMarks ? this.generateMarkItems(this.vtsMarks) : null;
    this.bindDraggingHandlers();
    this.toggleDragDisabled(this.vtsDisabled);

    if (this.getValue() === null) {
      this.setValue(this.formatValue(null));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsDisabled, vtsMarks, vtsRange } = changes;

    if (vtsDisabled && !vtsDisabled.firstChange) {
      this.toggleDragDisabled(vtsDisabled.currentValue);
    } else if (vtsMarks && !vtsMarks.firstChange) {
      this.marksArray = this.vtsMarks ? this.generateMarkItems(this.vtsMarks) : null;
    } else if (vtsRange && !vtsRange.firstChange) {
      this.setValue(this.formatValue(null));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(val: VtsSliderValue | null): void {
    this.setValue(val, true);
  }

  onValueChange(_value: VtsSliderValue): void {}

  onTouched(): void {}

  registerOnChange(fn: (value: VtsSliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
    this.toggleDragDisabled(isDisabled);
  }

  /**
   * Event handler is only triggered when a slider handler is focused.
   */
  onKeyDown(e: KeyboardEvent): void {
    const code = e.keyCode;
    const isIncrease = code === RIGHT_ARROW || code === UP_ARROW;
    const isDecrease = code === LEFT_ARROW || code === DOWN_ARROW;

    if (!(isIncrease || isDecrease)) {
      return;
    }

    e.preventDefault();

    let step = (isDecrease ? -this.vtsStep : this.vtsStep) * (this.vtsReverse ? -1 : 1);
    step = this.dir === 'rtl' ? step * -1 : step;
    const newVal = this.vtsRange
      ? (this.value as number[])[this.activeValueIndex!] + step
      : (this.value as number) + step;
    this.setActiveValue(ensureNumberInRange(newVal, this.vtsMin, this.vtsMax));
  }

  private setValue(value: VtsSliderValue | null, isWriteValue: boolean = false): void {
    if (isWriteValue) {
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!valuesEqual(this.value!, value!)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    }
  }

  private getValue(cloneAndSort: boolean = false): VtsSliderValue {
    if (cloneAndSort && this.value && isValueRange(this.value)) {
      return [...this.value].sort((a, b) => a - b);
    }
    return this.value!;
  }

  /**
   * Clone & sort current value and convert them to offsets, then return the new one.
   */
  private getValueToOffset(value?: VtsSliderValue): VtsSliderValue {
    let normalizedValue = value;

    if (typeof normalizedValue === 'undefined') {
      normalizedValue = this.getValue(true);
    }

    return isValueRange(normalizedValue)
      ? normalizedValue.map(val => this.valueToOffset(val))
      : this.valueToOffset(normalizedValue);
  }

  /**
   * Find the closest value to be activated.
   */
  private setActiveValueIndex(pointerValue: number): void {
    const value = this.getValue();
    if (isValueRange(value)) {
      let minimal: number | null = null;
      let gap: number;
      let activeIndex = -1;
      value.forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal!) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
      this.handlerComponents.toArray()[activeIndex].focus();
    } else {
      this.handlerComponents.toArray()[0].focus();
    }
  }

  private setActiveValue(pointerValue: number): void {
    if (isValueRange(this.value!)) {
      const newValue = [...(this.value as number[])];
      newValue[this.activeValueIndex!] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }

  /**
   * Update track and handles' position and length.
   */
  private updateTrackAndHandles(): void {
    const value = this.getValue();
    const offset = this.getValueToOffset(value);
    const valueSorted = this.getValue(true);
    const offsetSorted = this.getValueToOffset(valueSorted);
    const boundParts = isValueRange(valueSorted) ? valueSorted : [0, valueSorted];
    const trackParts = isValueRange(offsetSorted)
      ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]]
      : [0, offsetSorted];

    this.handles.forEach((handle, index) => {
      handle.offset = isValueRange(offset) ? offset[index] : offset;
      handle.value = isValueRange(value) ? value[index] : value || 0;
    });

    [this.bounds.lower, this.bounds.upper] = boundParts;
    [this.track.offset, this.track.length] = trackParts;

    this.cdr.markForCheck();
  }

  private onDragStart(value: number): void {
    this.toggleDragMoving(true);
    this.cacheSliderProperty();
    this.setActiveValueIndex(this.getLogicalValue(value));
    this.setActiveValue(this.getLogicalValue(value));
    this.showHandleTooltip(this.vtsRange ? this.activeValueIndex : 0);
  }

  private onDragMove(value: number): void {
    this.setActiveValue(this.getLogicalValue(value));
    this.cdr.markForCheck();
  }

  private getLogicalValue(value: number): number {
    if (this.vtsReverse) {
      if (!this.vtsVertical && this.dir === 'rtl') {
        return value;
      }
      return this.vtsMax - value + this.vtsMin;
    }
    if (!this.vtsVertical && this.dir === 'rtl') {
      return this.vtsMax - value + this.vtsMin;
    }

    return value;
  }

  private onDragEnd(): void {
    this.vtsOnAfterChange.emit(this.getValue(true));
    this.toggleDragMoving(false);
    this.cacheSliderProperty(true);
    this.hideAllHandleTooltip();
    this.cdr.markForCheck();
  }

  /**
   * Create user interactions handles.
   */
  private bindDraggingHandlers(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const sliderDOM = this.slider.nativeElement;
    const orientField = this.vtsVertical ? 'pageY' : 'pageX';
    const mouse: MouseTouchObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      pluckKey: [orientField]
    };
    const touch: MouseTouchObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      pluckKey: ['touches', '0', orientField],
      filter: (e: MouseEvent | TouchEvent) => e instanceof TouchEvent
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, pluckKey, filter: filterFunc = () => true } = source;

      source.startPlucked$ = fromEvent(sliderDOM, start).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        map((position: number) => this.findClosestValue(position))
      );
      source.end$ = fromEvent(document, end);
      source.moveResolved$ = fromEvent(document, move).pipe(
        filter(filterFunc),
        tap(silentEvent),
        pluck<Event, number>(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findClosestValue(position)),
        distinctUntilChanged(),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$!, touch.startPlucked$!);
    this.dragMove$ = merge(mouse.moveResolved$!, touch.moveResolved$!);
    this.dragEnd$ = merge(mouse.end$!, touch.end$!);
  }

  private subscribeDrag(periods: string[] = ['start', 'move', 'end']): void {
    if (periods.indexOf('start') !== -1 && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }

    if (periods.indexOf('move') !== -1 && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }

    if (periods.indexOf('end') !== -1 && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(periods: string[] = ['start', 'move', 'end']): void {
    if (periods.indexOf('start') !== -1 && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }

    if (periods.indexOf('move') !== -1 && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }

    if (periods.indexOf('end') !== -1 && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private toggleDragMoving(movable: boolean): void {
    const periods = ['move', 'end'];
    if (movable) {
      this.sliderService.isDragging = true;
      this.subscribeDrag(periods);
    } else {
      this.sliderService.isDragging = false;
      this.unsubscribeDrag(periods);
    }
  }

  private toggleDragDisabled(disabled: boolean): void {
    if (disabled) {
      this.unsubscribeDrag();
    } else {
      this.subscribeDrag(['start']);
    }
  }

  private findClosestValue(position: number): number {
    const sliderStart = this.getSliderStartPosition();
    const sliderLength = this.getSliderLength();
    const ratio = ensureNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const val = (this.vtsMax - this.vtsMin) * (this.vtsVertical ? 1 - ratio : ratio) + this.vtsMin;
    const points =
      this.vtsMarks === null
        ? []
        : Object.keys(this.vtsMarks)
            .map(parseFloat)
            .sort((a, b) => a - b);

    if (this.vtsStep !== 0 && !this.vtsDots) {
      const closestOne = Math.round(val / this.vtsStep) * this.vtsStep;
      points.push(closestOne);
    }

    const gaps = points.map(point => Math.abs(val - point));
    const closest = points[gaps.indexOf(Math.min(...gaps))];

    // return parseFloat(closest.toFixed(getPrecision(this.vtsStep)));
    return this.vtsStep === 0 ? closest : parseFloat(closest.toFixed(getPrecision(this.vtsStep)));
  }

  private valueToOffset(value: number): number {
    return getPercent(this.vtsMin, this.vtsMax, value);
  }

  private getSliderStartPosition(): number {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = getElementOffset(this.slider.nativeElement);
    return this.vtsVertical ? offset.top : offset.left;
  }

  private getSliderLength(): number {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.slider.nativeElement;
    return this.vtsVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
  }

  /**
   * Cache DOM layout/reflow operations for performance (may not necessary?)
   */
  private cacheSliderProperty(remove: boolean = false): void {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }

  private formatValue(value: VtsSliderValue | null): VtsSliderValue {
    if (!value) {
      return this.vtsRange ? [this.vtsMin, this.vtsMax] : this.vtsMin;
    } else if (assertValueValid(value, this.vtsRange)) {
      return isValueRange(value)
        ? value.map(val => ensureNumberInRange(val, this.vtsMin, this.vtsMax))
        : ensureNumberInRange(value, this.vtsMin, this.vtsMax);
    } else {
      return this.vtsDefaultValue
        ? this.vtsDefaultValue
        : this.vtsRange
        ? [this.vtsMin, this.vtsMax]
        : this.vtsMin;
    }
  }

  /**
   * Show one handle's tooltip and hide others'.
   */
  private showHandleTooltip(handleIndex: number = 0): void {
    this.handles.forEach((handle, index) => {
      handle.active = index === handleIndex;
    });
  }

  private hideAllHandleTooltip(): void {
    this.handles.forEach(handle => (handle.active = false));
  }

  private generateMarkItems(marks: VtsMarks): VtsExtendedMark[] | null {
    const marksArray: VtsExtendedMark[] = [];
    for (const key in marks) {
      const mark = marks[key];
      const val = typeof key === 'number' ? key : parseFloat(key);
      if (val >= this.vtsMin && val <= this.vtsMax) {
        marksArray.push({
          value: val,
          offset: this.valueToOffset(val),
          config: mark
        });
      }
    }
    return marksArray.length ? marksArray : null;
  }
}

function getValueTypeNotMatchError(): Error {
  return new Error(
    `The "vtsRange" can't match the "ngModel"'s type, please check these properties: "vtsRange", "ngModel", "vtsDefaultValue".`
  );
}

function isValueRange(value: VtsSliderValue): value is number[] {
  if (value instanceof Array) {
    return value.length === 2;
  } else {
    return false;
  }
}

function generateHandlers(amount: number): VtsSliderHandler[] {
  return Array(amount)
    .fill(0)
    .map(() => ({ offset: null, value: null, active: false }));
}

/**
 * Check if value is valid and throw error if value-type/range not match.
 */
function assertValueValid(value: VtsSliderValue, isRange?: boolean): boolean {
  if (
    (!isValueRange(value) && isNaN(value)) ||
    (isValueRange(value) && value.some(v => isNaN(v)))
  ) {
    return false;
  }
  return assertValueTypeMatch(value, isRange);
}

/**
 * Assert that if `this.vtsRange` is `true`, value is also a range, vice versa.
 */
function assertValueTypeMatch(value: VtsSliderValue, isRange: boolean = false): boolean {
  if (isValueRange(value) !== isRange) {
    throw getValueTypeNotMatchError();
  }
  return true;
}

function valuesEqual(valA: VtsSliderValue, valB: VtsSliderValue): boolean {
  if (typeof valA !== typeof valB) {
    return false;
  }
  return isValueRange(valA) && isValueRange(valB) ? arraysEqual<number>(valA, valB) : valA === valB;
}
