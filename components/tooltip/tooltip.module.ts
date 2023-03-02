/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
// NOTE: the `t` is not uppercase in directives. Change this would however introduce breaking change.
import { VtsToolTipComponent, VtsTooltipDirective } from './tooltip';

@NgModule({
  declarations: [VtsToolTipComponent, VtsTooltipDirective],
  exports: [VtsToolTipComponent, VtsTooltipDirective],
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    VtsOutletModule,
    VtsOverlayModule,
    VtsNoAnimationModule
  ]
})
export class VtsToolTipModule {}
