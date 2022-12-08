/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: '[vtsDrawerContent]',
  exportAs: 'vtsDrawerContent'
})
export class VtsDrawerContentDirective {
  constructor(public templateRef: TemplateRef<VtsSafeAny>) {}
}
