/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, Input, TemplateRef } from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-tab-close-button, button[vts-tab-close-button]',
  template: `
    <ng-container *vtsStringTemplateOutlet="closeIcon; let icon">
      <i vts-icon [vtsType]="icon"></i>
    </ng-container>
  `,
  host: {
    class: 'vts-tabs-tab-remove',
    'aria-label': 'Close tab',
    type: 'button'
  }
})
export class VtsTabCloseButtonComponent {
  @Input() closeIcon: string | TemplateRef<VtsSafeAny> = 'Close:vts';

  constructor() {}
}
