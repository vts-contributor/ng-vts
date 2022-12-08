/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Optional, TemplateRef } from '@angular/core';
import { VtsModalRef } from './modal-ref';

@Directive({
  selector: '[vtsModalFooter]',
  exportAs: 'vtsModalFooter'
})
export class VtsModalFooterDirective {
  constructor(@Optional() private vtsModalRef: VtsModalRef, public templateRef: TemplateRef<{}>) {
    if (this.vtsModalRef) {
      this.vtsModalRef.updateConfig({
        vtsFooter: this.templateRef
      });
    }
  }
}
