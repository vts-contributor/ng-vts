/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { FunctionProp, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { isNonEmptyString, isTemplateRef } from '@ui-vts/ng-vts/core/util';
import { VtsCalendarI18nInterface } from '@ui-vts/ng-vts/i18n';
import { DateBodyRow, DateCell } from './interface';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractTable implements OnInit, OnChanges {
  isTemplateRef = isTemplateRef;
  isNonEmptyString = isNonEmptyString;
  headRow: DateCell[] = [];
  bodyRows: DateBodyRow[] = [];
  MAX_ROW = 6;
  MAX_COL = 7;

  @Input() prefixCls: string = 'vts-picker';
  @Input() value!: CandyDate;
  @Input() locale!: VtsCalendarI18nInterface;
  @Input() activeDate: CandyDate = new CandyDate();
  @Input() showWeek: boolean = false;
  @Input() selectedValue: CandyDate[] = []; // Range ONLY
  @Input() hoverValue: CandyDate[] = []; // Range ONLY
  @Input() disabledDate?: (d: Date) => boolean;
  @Input() cellRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;
  @Input() fullCellRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;

  @Output() readonly valueChange = new EventEmitter<CandyDate>();
  @Output() readonly cellHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  protected render(): void {
    if (this.activeDate) {
      this.headRow = this.makeHeadRow();
      this.bodyRows = this.makeBodyRows();
    }
  }

  trackByBodyRow(_index: number, item: DateBodyRow): VtsSafeAny {
    return item.trackByIndex;
  }

  trackByBodyColumn(_index: number, item: DateCell): VtsSafeAny {
    return item.trackByIndex;
  }

  hasRangeValue(): boolean {
    return this.selectedValue?.length > 0 || this.hoverValue?.length > 0;
  }

  getClassMap(cell: DateCell): { [key: string]: boolean } {
    return {
      [`vts-picker-cell`]: true,
      [`vts-picker-cell-in-view`]: true,
      [`vts-picker-cell-selected`]: cell.isSelected,
      [`vts-picker-cell-disabled`]: cell.isDisabled,
      [`vts-picker-cell-in-range`]: !!cell.isInSelectedRange,
      [`vts-picker-cell-range-start`]: !!cell.isSelectedStart,
      [`vts-picker-cell-range-end`]: !!cell.isSelectedEnd,
      [`vts-picker-cell-range-start-single`]: !!cell.isStartSingle,
      [`vts-picker-cell-range-end-single`]: !!cell.isEndSingle,
      [`vts-picker-cell-range-hover`]: !!cell.isInHoverRange,
      [`vts-picker-cell-range-hover-start`]: !!cell.isHoverStart,
      [`vts-picker-cell-range-hover-end`]: !!cell.isHoverEnd,
      [`vts-picker-cell-range-hover-edge-start`]: !!cell.isFirstCellInPanel,
      [`vts-picker-cell-range-hover-edge-end`]: !!cell.isLastCellInPanel,
      [`vts-picker-cell-range-start-near-hover`]: !!cell.isRangeStartNearHover,
      [`vts-picker-cell-range-end-near-hover`]: !!cell.isRangeEndNearHover
    };
  }

  abstract makeHeadRow(): DateCell[];
  abstract makeBodyRows(): DateBodyRow[];

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }

    if (
      changes.disabledDate ||
      changes.locale ||
      changes.showWeek ||
      this.isDateRealChange(changes.activeDate) ||
      this.isDateRealChange(changes.value) ||
      this.isDateRealChange(changes.selectedValue) ||
      this.isDateRealChange(changes.hoverValue)
    ) {
      this.render();
    }
  }

  private isDateRealChange(change: SimpleChange): boolean {
    if (change) {
      const previousValue: CandyDate | CandyDate[] = change.previousValue;
      const currentValue: CandyDate | CandyDate[] = change.currentValue;
      if (Array.isArray(currentValue)) {
        return (
          !Array.isArray(previousValue) ||
          currentValue.length !== previousValue.length ||
          currentValue.some((value, index) => {
            const previousCandyDate = previousValue[index];
            return previousCandyDate instanceof CandyDate
              ? previousCandyDate.isSameDay(value)
              : previousCandyDate !== value;
          })
        );
      } else {
        return !this.isSameDate(previousValue as CandyDate, currentValue);
      }
    }
    return false;
  }

  private isSameDate(left: CandyDate, right: CandyDate): boolean {
    return (!left && !right) || (left && right && right.isSameDay(left));
  }
}
