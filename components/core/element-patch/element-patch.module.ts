/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsElementPatchDirective } from './element-patch.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [VtsElementPatchDirective],
  exports: [VtsElementPatchDirective]
})
export class VtsElementPatchModule {}
