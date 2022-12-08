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

@Component({
  selector: '[vts-input-group-slot]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i vts-icon [vtsType]="icon" *ngIf="icon"></i>
    <ng-container *vtsStringTemplateOutlet="template">
      {{ template }}
    </ng-container>
  `,
  host: {
    '[class.vts-input-group-addon]': `type === 'addon'`,
    '[class.vts-input-prefix]': `type === 'prefix'`,
    '[class.vts-input-suffix]': `type === 'suffix'`
  }
})
export class VtsInputGroupSlotComponent {
  @Input() icon?: string | null = null;
  @Input() type: 'addon' | 'prefix' | 'suffix' | null = null;
  @Input() template?: string | TemplateRef<void> | null = null;
}
