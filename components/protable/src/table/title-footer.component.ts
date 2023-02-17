/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-table-title-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *vtsStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *vtsStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
  host: {
    '[class.vts-table-title]': `title !== null`,
    '[class.vts-table-footer]': `footer !== null`
  }
})
export class VtsTableTitleFooterComponent {
  @Input() title: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() footer: string | TemplateRef<VtsSafeAny> | null = null;
}
