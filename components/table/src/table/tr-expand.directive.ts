/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'tr[vtsExpand]',
  host: {
    '[hidden]': `!vtsExpand`
  }
})
export class VtsTrExpandDirective {
  @Input() vtsExpand = true;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-table-expanded-row');
  }
}
