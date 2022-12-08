/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: '[vts-virtual-scroll]',
  exportAs: 'vtsVirtualScroll'
})
export class VtsTableVirtualScrollDirective {
  constructor(public templateRef: TemplateRef<{ $implicit: VtsSafeAny; index: number }>) {}
}
