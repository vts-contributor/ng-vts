/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vts-avatar-group',
  exportAs: 'vtsAvatarGroup',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'vts-avatar-group'
  }
})
export class VtsAvatarGroupComponent {}
