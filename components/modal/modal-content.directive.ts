/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[vtsModalContent]',
  exportAs: 'vtsModalContent'
})
export class VtsModalContentDirective {
  constructor(public templateRef: TemplateRef<{}>) {}
}
