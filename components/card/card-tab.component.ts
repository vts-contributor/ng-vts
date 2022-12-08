/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'vts-card-tab',
  exportAs: 'vtsCardTab',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class VtsCardTabComponent {
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<void>;
}
