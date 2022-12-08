/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { warn } from '@ui-vts/ng-vts/core/logger';
import { IndexableObject, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { BehaviorSubject, Observable } from 'rxjs';
import en_US from './languages/en_US';

import { DateLocale, VtsDateFormatInterface, VtsI18nInterface } from './vts-i18n.interface';
import { VTS_DATE_FORMAT, VTS_DATE_LOCALE, VTS_I18N } from './vts-i18n.token';

@Injectable({
  providedIn: 'root'
})
export class VtsI18nService {
  private _locale!: VtsI18nInterface;
  private _change = new BehaviorSubject<VtsI18nInterface>(this._locale);
  private dateLocale!: DateLocale;
  private dateFormat!: VtsDateFormatInterface;

  get localeChange(): Observable<VtsI18nInterface> {
    return this._change.asObservable();
  }

  constructor(
    @Optional() @Inject(VTS_I18N) locale: VtsI18nInterface,
    @Optional() @Inject(VTS_DATE_LOCALE) dateLocale: DateLocale,
    @Optional() @Inject(VTS_DATE_FORMAT) dateFormat: VtsDateFormatInterface
  ) {
    this.setLocale(locale || en_US);
    this.setDateLocale(dateLocale || null);
    this.setDateFormat(dateFormat || null);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  translate(path: string, data?: VtsSafeAny): string {
    // this._logger.debug(`[VtsI18nService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach(
          key => (content = content.replace(new RegExp(`%${key}%`, 'g'), data[key]))
        );
      }
      return content;
    }
    return path;
  }

  /**
   * Set/Change current locale globally throughout the WHOLE application
   * NOTE: If called at runtime, rendered interface may not change along with the locale change,
   * because this do not trigger another render schedule.
   *
   * @param locale The translating letters
   */
  setLocale(locale: VtsI18nInterface): void {
    if (this._locale && this._locale.locale === locale.locale) {
      return;
    }
    this._locale = locale;
    this._change.next(locale);
  }

  getLocale(): VtsI18nInterface {
    return this._locale;
  }

  getLocaleId(): string {
    return this._locale ? this._locale.locale : '';
  }

  setDateLocale(dateLocale: DateLocale): void {
    this.dateLocale = dateLocale;
  }

  getDateLocale(): DateLocale {
    return this.dateLocale;
  }

  setDateFormat(dateFormat: VtsDateFormatInterface): void {
    this.dateFormat = dateFormat;
  }

  getDateFormat(): VtsDateFormatInterface {
    return this.dateFormat;
  }

  /**
   * Get locale data
   * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
   * @param defaultValue default value if the result is not "truthy"
   */
  getLocaleData(path: string, defaultValue?: VtsSafeAny): VtsSafeAny {
    const result = path ? this._getObjectPath(this._locale, path) : this._locale;

    if (!result && !defaultValue) {
      warn(`Missing translations for "${path}" in language "${this._locale.locale}".
You can use "VtsI18nService.setLocale" as a temporary fix.
Welcome to submit a pull request to help us optimize the translations!
https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md`);
    }

    return result || defaultValue || this._getObjectPath(en_US, path) || {};
  }

  private _getObjectPath(obj: IndexableObject, path: string): string | object | VtsSafeAny {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}
