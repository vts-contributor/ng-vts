/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Directive({
  selector: 'th[vtsEllipsis],td[vtsEllipsis]',
  host: {
    '[class.vts-table-cell-ellipsis]': 'vtsEllipsis'
  }
})
export class VtsCellEllipsisDirective {
  static ngAcceptInputType_vtsEllipsis: BooleanInput;

  @Input() @InputBoolean() vtsEllipsis = true;
}
