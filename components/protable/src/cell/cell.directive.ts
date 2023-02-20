import { Directive, Optional } from '@angular/core';
import { VtsProTableStyleService } from '../protable-style.service';

@Directive({
  selector: 'th:not(.vts-disable-th):not([mat-cell]), td:not(.vts-disable-td):not([mat-cell])',
  host: {
    '[class.vts-table-cell]': 'isInsideTable'
  }
})
export class VtsProTableCellDirective {
  isInsideTable = false;
  constructor(@Optional() vtsTableStyleService: VtsProTableStyleService) {
    this.isInsideTable = !!vtsTableStyleService;
  }
}
