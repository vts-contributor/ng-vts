/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional } from '@angular/core';
import { VtsTableStyleService } from '../table-style.service';

@Directive({
  selector: 'th:not(.vts-disable-th):not([mat-cell]), td:not(.vts-disable-td):not([mat-cell])',
  host: {
    '[class.vts-table-cell]': 'isInsideTable'
  }
})
export class VtsTableCellDirective {
  isInsideTable = false;
  constructor(@Optional() vtsTableStyleService: VtsTableStyleService) {
    this.isInsideTable = !!vtsTableStyleService;
  }
}
