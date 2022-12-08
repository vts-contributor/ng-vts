/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  CandyDate,
  cloneDate,
  CompatibleValue,
  NormalizedMode,
  normalizeRangeValue
} from '@ui-vts/ng-vts/core/time';
import { ReplaySubject, Subject } from 'rxjs';
import { CompatibleDate, VtsDateMode, RangePartType } from './standard-types';

@Injectable()
export class DatePickerService implements OnDestroy {
  initialValue?: CompatibleValue;
  value!: CompatibleValue;
  activeDate?: CompatibleValue;
  activeInput: RangePartType = 'left';
  arrowLeft: number = 0;
  isRange = false;
  isRangeSingleMode = false;

  valueChange$ = new ReplaySubject<CompatibleValue>(1);
  emitValue$ = new Subject<void>();
  inputPartChange$ = new Subject<RangePartType>();

  initValue(): void {
    if (this.isRange) {
      this.initialValue = [];
    } else {
      this.initialValue = null;
    }
    this.setValue(this.initialValue);
  }

  hasValue(value: CompatibleValue = this.value): boolean {
    if (Array.isArray(value)) {
      return !!value[0] || !!value[1];
    } else {
      return !!value;
    }
  }

  makeValue(value?: CompatibleDate): CompatibleValue {
    if (this.isRange) {
      return value ? (value as Date[]).map(val => new CandyDate(val)) : [];
    } else {
      return value ? new CandyDate(value as Date) : null;
    }
  }

  setActiveDate(
    value: CompatibleValue,
    hasTimePicker: boolean = false,
    mode: NormalizedMode = 'month'
  ): void {
    const parentPanels: { [key in VtsDateMode]?: NormalizedMode } = {
      date: 'month',
      month: 'year',
      year: 'decade'
    };
    if (this.isRange) {
      this.activeDate = normalizeRangeValue(
        value as CandyDate[],
        hasTimePicker,
        parentPanels[mode],
        this.activeInput
      );
    } else {
      this.activeDate = cloneDate(value);
    }
  }

  setValue(value: CompatibleValue): void {
    this.value = value;
    this.valueChange$.next(this.value);
  }

  getActiveIndex(part: RangePartType = this.activeInput): number {
    return { left: 0, right: 1 }[part];
  }

  compareDate(source: Date, dest: Date, includeTime = false) {
    const s = new Date(source);
    const d = new Date(dest);
    if (!includeTime) {
      s.setHours(0);
      s.setMinutes(0);
      s.setSeconds(0);
      s.setMilliseconds(0);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    }

    if (s.getTime() > d.getTime()) return 1;
    if (s.getTime() < d.getTime()) return -1;
    return 0;
  }

  ngOnDestroy(): void {
    this.valueChange$.complete();
    this.emitValue$.complete();
    this.inputPartChange$.complete();
  }
}
