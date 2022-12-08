/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'vts-row-indent',
  host: {
    '[style.padding-left.px]': 'indentSize'
  }
})
export class VtsRowIndentDirective {
  @Input() indentSize = 0;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-table-row-indent');
  }
}
