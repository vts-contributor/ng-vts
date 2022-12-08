/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate } from '@ui-vts/ng-vts/core/time';
import { FunctionProp } from '@ui-vts/ng-vts/core/types';
import { VtsCalendarI18nInterface } from '@ui-vts/ng-vts/i18n';
import { DisabledDateFn, VtsDateMode, RangePartType, SupportTimeOptions } from './standard-types';
import { PREFIX_CLASS } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'inner-popup',
  exportAs: 'innerPopup',
  template: `
    <div [class.vts-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        <ng-container [ngSwitch]="panelMode">
          <ng-container *ngSwitchCase="'decade'">
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></decade-header>
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              ></decade-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'year'">
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></year-header>
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              ></year-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'month'">
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></month-header>
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              ></month-table>
            </div>
          </ng-container>

          <ng-container *ngSwitchDefault>
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="
                showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')
              "
              [showSuperNextBtn]="
                showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              [showPreBtn]="
                showWeek ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')
              "
              [showNextBtn]="
                showWeek ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            ></date-header>
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              ></date-table>
            </div>
          </ng-container>
        </ng-container>
      </div>
      <ng-container *ngIf="showTimePicker && timeOptions">
        <vts-time-picker-panel
          [vtsInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.vtsFormat)"
          [vtsHourStep]="$any(timeOptions.vtsHourStep)"
          [vtsMinuteStep]="$any(timeOptions.vtsMinuteStep)"
          [vtsSecondStep]="$any(timeOptions.vtsSecondStep)"
          [vtsDisabledHours]="$any(timeOptions.vtsDisabledHours)"
          [vtsDisabledMinutes]="$any(timeOptions.vtsDisabledMinutes)"
          [vtsDisabledSeconds]="$any(timeOptions.vtsDisabledSeconds)"
          [vtsHideDisabledOptions]="!!timeOptions.vtsHideDisabledOptions"
          [vtsDefaultOpenValue]="$any(timeOptions.vtsDefaultOpenValue)"
          [vtsUse12Hours]="!!timeOptions.vtsUse12Hours"
          [vtsAddOn]="$any(timeOptions.vtsAddOn)"
        ></vts-time-picker-panel>
        <!-- use [opened] to trigger time panel \`initPosition()\` -->
      </ng-container>
    </div>
  `
})
export class InnerPopupComponent implements OnChanges {
  @Input() activeDate!: CandyDate;
  @Input() endPanelMode!: VtsDateMode;
  @Input() panelMode!: VtsDateMode;
  @Input() showWeek!: boolean;
  @Input() locale!: VtsCalendarI18nInterface;
  @Input() showTimePicker!: boolean;
  @Input() timeOptions!: SupportTimeOptions | null;
  @Input() disabledDate?: DisabledDateFn;
  @Input() dateRender?: string | TemplateRef<Date> | FunctionProp<TemplateRef<Date> | string>;
  @Input() selectedValue!: CandyDate[]; // Range ONLY
  @Input() hoverValue!: CandyDate[]; // Range ONLY
  @Input() value!: CandyDate;
  @Input() partType!: RangePartType;

  @Output() readonly panelModeChange = new EventEmitter<VtsDateMode>();
  // TODO: name is not proper
  @Output() readonly headerChange = new EventEmitter<CandyDate>(); // Emitted when user changed the header's value
  @Output() readonly selectDate = new EventEmitter<CandyDate>(); // Emitted when the date is selected by click the date panel
  @Output() readonly selectTime = new EventEmitter<CandyDate>();
  @Output() readonly cellHover = new EventEmitter<CandyDate>(); // Emitted when hover on a day by mouse enter

  prefixCls: string = PREFIX_CLASS;

  /**
   * Hide "next" arrow in left panel,
   * hide "prev" arrow in right panel
   * @param direction
   * @param panelMode
   */
  enablePrevNext(direction: 'prev' | 'next', panelMode: VtsDateMode): boolean {
    if (
      !this.showTimePicker &&
      panelMode === this.endPanelMode &&
      ((this.partType === 'left' && direction === 'next') ||
        (this.partType === 'right' && direction === 'prev'))
    ) {
      return false;
    }
    return true;
  }

  onSelectTime(date: Date): void {
    this.selectTime.emit(new CandyDate(date));
  }

  // The value real changed to outside
  onSelectDate(date: CandyDate | Date): void {
    const value = date instanceof CandyDate ? date : new CandyDate(date);
    const timeValue = this.timeOptions && this.timeOptions.vtsDefaultOpenValue;

    // Display timeValue when value is null
    if (!this.value && timeValue) {
      value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
    }

    this.selectDate.emit(value);
  }

  onChooseMonth(value: CandyDate): void {
    this.activeDate = this.activeDate.setMonth(value.getMonth());
    if (this.endPanelMode === 'month') {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelModeChange.emit(this.endPanelMode);
    }
  }

  onChooseYear(value: CandyDate): void {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === 'year') {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelModeChange.emit(this.endPanelMode);
    }
  }

  onChooseDecade(value: CandyDate): void {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === 'decade') {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelModeChange.emit('year');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
    // New Antd vesion has merged 'date' ant 'time' to one panel,
    // So there is not 'time' panel
    if (changes.panelMode && changes.panelMode.currentValue === 'time') {
      this.panelMode = 'date';
    }
  }
}
