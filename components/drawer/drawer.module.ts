/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsDrawerContentDirective } from './drawer-content.directive';
import { VtsDrawerComponent } from './drawer.component';
import { VtsDrawerServiceModule } from './drawer.service.module';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    PortalModule,
    VtsIconModule,
    VtsOutletModule,
    VtsNoAnimationModule,
    VtsDrawerServiceModule
  ],
  exports: [VtsDrawerComponent, VtsDrawerContentDirective],
  declarations: [VtsDrawerComponent, VtsDrawerContentDirective]
})
export class VtsDrawerModule {}
