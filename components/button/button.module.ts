/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ɵVtsTransitionPatchModule as VtsTransitionPatchModule } from '@ui-vts/ng-vts/core/transition-patch';
import { VtsWaveModule } from '@ui-vts/ng-vts/core/wave';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsButtonGroupComponent } from './button-group.component';
import { VtsButtonComponent } from './button.component';

@NgModule({
  declarations: [VtsButtonComponent, VtsButtonGroupComponent],
  exports: [VtsButtonComponent, VtsButtonGroupComponent, VtsTransitionPatchModule, VtsWaveModule],
  imports: [BidiModule, CommonModule, VtsWaveModule, VtsIconModule, VtsTransitionPatchModule]
})
export class VtsButtonModule {}
