/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Locale } from 'date-fns';

export interface VtsPaginationI18nInterface {
  items_per_page: string;
  jump_to: string;
  page: string;

  prev_page: string;
  next_page: string;
  prev_5: string;
  next_5: string;
  begin: string;
  last: string;
}

export interface VtsGlobalI18nInterface {
  placeholder: string;
}

export interface VtsDatePickerI18nInterface {
  lang: VtsDatePickerLangI18nInterface;
  timePickerLocale: VtsTimePickerI18nInterface;
}

export interface VtsCalendarI18nInterface {
  today: string;
  now: string;
  backToToday: string;
  ok: string;
  clear: string;
  month: string;
  year: string;
  timeSelect: string;
  dateSelect: string;
  monthSelect: string;
  yearSelect: string;
  decadeSelect: string;
  yearFormat: string;
  monthFormat?: string;
  dateFormat: string;
  dayFormat: string;
  dateTimeFormat: string;
  monthBeforeYear?: boolean;
  previousMonth: string;
  nextMonth: string;
  previousYear: string;
  nextYear: string;
  previousDecade: string;
  nextDecade: string;
  previousCentury: string;
  nextCentury: string;
}

export interface VtsDatePickerLangI18nInterface extends VtsCalendarI18nInterface {
  placeholder?: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangePlaceholder?: string[];
  rangeYearPlaceholder?: string[];
  rangeMonthPlaceholder?: string[];
  rangeWeekPlaceholder?: string[];
}

export interface VtsTimePickerI18nInterface {
  placeholder?: string;
  rangePlaceholder?: string[];
}

export type ValidateMessage = string | (() => string);

export type VtsCascaderI18nInterface = VtsGlobalI18nInterface;

export interface VtsTableI18nInterface {
  filterTitle?: string;
  filterConfirm?: string;
  filterReset?: string;
  selectAll?: string;
  selectInvert?: string;
  selectionAll?: string;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
  triggerDesc?: string;
  triggerAsc?: string;
  cancelSort?: string;
}

export interface VtsModalI18nInterface {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export interface VtsPopconfirmI18nInterface {
  okText: string;
  cancelText: string;
}

export interface VtsTransferI18nInterface {
  titles?: string[];
  searchPlaceholder?: string;
  itemUnit?: string;
  itemsUnit?: string;
}

export interface VtsUploadI18nInterface {
  uploading?: string;
  removeFile?: string;
  uploadError?: string;
  previewFile?: string;
  downloadFile?: string;
}

export interface VtsEmptyI18nInterface {
  description: string;
}

export interface VtsTextI18nInterface {
  edit: string;
  copy: string;
  copied: string;
  expand: string;
}

export interface VtsI18nInterface {
  locale: string;
  Pagination: VtsPaginationI18nInterface;
  DatePicker: VtsDatePickerI18nInterface;
  TimePicker: VtsTimePickerI18nInterface;
  Calendar: VtsDatePickerI18nInterface;
  global?: VtsGlobalI18nInterface;
  Table: VtsTableI18nInterface;
  Modal: VtsModalI18nInterface;
  Popconfirm: VtsPopconfirmI18nInterface;
  Transfer: VtsTransferI18nInterface;
  Upload: VtsUploadI18nInterface;
  Empty: VtsEmptyI18nInterface;
  Text?: VtsTextI18nInterface;
}

export interface VtsDateFormatInterface {
  YEAR_TABLE_BODY?: string;
  MONTH_TABLE_HEADER?: string;
  MONTH_TABLE_BODY?: string;
  DATE_TABLE_HEADER_MONTH?: string;
  DATE_TABLE_HEADER_YEAR?: string;
  DATE_TABLE_BODY_HEAD_TITLE?: string;
  DATE_TABLE_BODY_HEAD_LABEL?: string;
  DATE_TABLE_BODY_CONTENT_TITLE?: string;
  DATE_TABLE_BODY_CONTENT_LABEL?: string;
}

export type DateLocale = Locale;
