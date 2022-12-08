/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalOptions } from './modal-types';

@Component({
  selector: 'button[vts-modal-close]',
  exportAs: 'VtsModalCloseBuiltin',
  template: `
    <span class="vts-modal-close-x">
      <ng-container *vtsStringTemplateOutlet="config.vtsCloseIcon; let closeIcon">
        <i vts-icon [vtsType]="closeIcon" class="vts-modal-close-icon"></i>
      </ng-container>
    </span>
  `,
  host: {
    class: 'vts-modal-close',
    'aria-label': 'Close'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsModalCloseComponent {
  constructor(public config: ModalOptions) {}
}
