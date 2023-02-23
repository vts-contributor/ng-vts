/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'th[vtsAlign],td[vtsAlign]',
  host: {
    '[style.text-align]': 'vtsAlign'
  }
})
export class VtsCellAlignDirective {
  @Input() vtsAlign: 'left' | 'right' | 'center' | null = null;
}
