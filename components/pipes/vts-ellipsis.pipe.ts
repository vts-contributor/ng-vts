/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Pipe({
  name: 'vtsEllipsis'
})
export class VtsEllipsisPipe implements PipeTransform {
  transform(value: VtsSafeAny, length?: number, suffix: string = ''): VtsSafeAny {
    if (typeof value !== 'string') {
      return value;
    }

    const len = typeof length === 'undefined' ? value.length : length;

    if (value.length <= len) {
      return value;
    }

    return value.substring(0, len) + suffix;
  }
}
