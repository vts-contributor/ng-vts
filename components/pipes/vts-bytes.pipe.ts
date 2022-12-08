/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { isNumberFinite, toDecimal } from '@ui-vts/ng-vts/core/util';

export type ByteUnit = 'B' | 'kB' | 'KB' | 'MB' | 'GB' | 'TB';

@Pipe({
  name: 'vtsBytes'
})
export class VtsBytesPipe implements PipeTransform {
  static formats: { [key: string]: { max: number; prev?: ByteUnit } } = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
  };

  transform(
    input: VtsSafeAny,
    decimal: number = 0,
    from: ByteUnit = 'B',
    to?: ByteUnit
  ): VtsSafeAny {
    if (!(isNumberFinite(input) && isNumberFinite(decimal) && decimal % 1 === 0 && decimal >= 0)) {
      return input;
    }

    let bytes = input;
    let unit = from;
    while (unit !== 'B') {
      bytes *= 1024;
      unit = VtsBytesPipe.formats[unit].prev!;
    }

    if (to) {
      const format = VtsBytesPipe.formats[to];

      const result = toDecimal(VtsBytesPipe.calculateResult(format, bytes), decimal);

      return VtsBytesPipe.formatResult(result, to);
    }

    for (const key in VtsBytesPipe.formats) {
      if (VtsBytesPipe.formats.hasOwnProperty(key)) {
        const format = VtsBytesPipe.formats[key];
        if (bytes < format.max) {
          const result = toDecimal(VtsBytesPipe.calculateResult(format, bytes), decimal);

          return VtsBytesPipe.formatResult(result, key);
        }
      }
    }
  }

  static formatResult(result: number, unit: string): string {
    return `${result} ${unit}`;
  }

  static calculateResult(format: { max: number; prev?: ByteUnit }, bytes: number): number {
    const prev = format.prev ? VtsBytesPipe.formats[format.prev] : undefined;
    return prev ? bytes / prev.max : bytes;
  }
}
