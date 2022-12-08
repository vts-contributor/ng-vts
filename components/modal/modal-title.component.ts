/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalOptions } from './modal-types';

@Component({
  selector: 'div[vts-modal-title]',
  exportAs: 'VtsModalTitleBuiltin',
  template: `
    <div class="vts-modal-title">
      <ng-container *vtsStringTemplateOutlet="config.vtsTitle">
        <div [innerHTML]="config.vtsTitle"></div>
      </ng-container>
    </div>
  `,
  host: {
    class: 'vts-modal-header'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsModalTitleComponent {
  constructor(public config: ModalOptions) {}
}
