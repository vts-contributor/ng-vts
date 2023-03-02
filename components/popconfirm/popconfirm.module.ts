/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsPopconfirmComponent, VtsPopconfirmDirective } from './popconfirm';

@NgModule({
  declarations: [VtsPopconfirmComponent, VtsPopconfirmDirective],
  exports: [VtsPopconfirmComponent, VtsPopconfirmDirective],
  imports: [
    BidiModule,
    CommonModule,
    VtsButtonModule,
    OverlayModule,
    VtsI18nModule,
    VtsIconModule,
    VtsOutletModule,
    VtsOverlayModule,
    VtsNoAnimationModule,
    VtsToolTipModule
  ]
})
export class VtsPopconfirmModule {}
