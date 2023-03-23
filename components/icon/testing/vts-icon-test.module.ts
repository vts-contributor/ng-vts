/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

/**
 * Include this module in every testing spec, except `icon.spec.ts`.
 */
// @dynamic
@NgModule({
  exports: [VtsIconModule]
})
export class VtsIconTestModule {}
