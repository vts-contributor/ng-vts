/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[vtsDateCell]',
  exportAs: 'vtsDateCell'
})
export class VtsDateCellDirective {}

@Directive({
  selector: '[vtsMonthCell]',
  exportAs: 'vtsMonthCell'
})
export class VtsMonthCellDirective {}

@Directive({
  selector: '[vtsDateFullCell]',
  exportAs: 'vtsDateFullCell'
})
export class VtsDateFullCellDirective {}

@Directive({
  selector: '[vtsMonthFullCell]',
  exportAs: 'vtsMonthFullCell'
})
export class VtsMonthFullCellDirective {}
