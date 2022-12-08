/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { DateLocale, VtsDateFormatInterface, VtsI18nInterface } from './vts-i18n.interface';

export const VTS_I18N = new InjectionToken<VtsI18nInterface>('vts-i18n');

/** Locale for date operations, should import from date-fns, see example: https://github.com/date-fns/date-fns/blob/v1.30.1/src/locale/zh_cn/index.js */
export const VTS_DATE_LOCALE = new InjectionToken<DateLocale>('vts-date-locale');

export const VTS_DATE_FORMAT = new InjectionToken<VtsDateFormatInterface>('vts-date-format');
