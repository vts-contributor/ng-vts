/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Directive({
  selector: '[vts-card-grid]',
  exportAs: 'vtsCardGrid',
  host: {
    '[class.vts-card-hoverable]': 'vtsHoverable'
  }
})
export class VtsCardGridDirective {
  static ngAcceptInputType_vtsHoverable: BooleanInput;
  @Input() @InputBoolean() vtsHoverable = true;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card-grid');
  }
}
