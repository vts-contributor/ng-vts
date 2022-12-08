/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

/**
 * A patch directive to select the element of a component.
 */
@Directive({
  selector: '[vtsElement], [vts-element]',
  exportAs: 'vtsElement'
})
export class VtsElementPatchDirective {
  get nativeElement(): VtsSafeAny {
    return this.elementRef.nativeElement;
  }

  constructor(public elementRef: ElementRef) {}
}
