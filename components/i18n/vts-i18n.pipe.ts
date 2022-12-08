/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { VtsI18nService } from './vts-i18n.service';

@Pipe({
  name: 'vtsI18n'
})
export class VtsI18nPipe implements PipeTransform {
  constructor(private _locale: VtsI18nService) {}

  transform(path: string, keyValue?: object): string {
    return this._locale.translate(path, keyValue);
  }
}
