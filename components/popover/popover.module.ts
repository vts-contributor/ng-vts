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

import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsPopoverComponent, VtsPopoverDirective } from './popover';

@NgModule({
  exports: [VtsPopoverDirective, VtsPopoverComponent],
  declarations: [VtsPopoverDirective, VtsPopoverComponent],
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    VtsOutletModule,
    VtsOverlayModule,
    VtsNoAnimationModule,
    VtsToolTipModule
  ]
})
export class VtsPopoverModule {}
