/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsAlertModule } from '@ui-vts/ng-vts/alert';
import { VtsToastContainerComponent } from './toast-container.component';
import { VtsToastComponent } from './toast.component';
import { VtsToastServiceModule } from './toast.service.module';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    VtsIconModule,
    VtsOutletModule,
    VtsToastServiceModule,
    VtsAlertModule
  ],
  declarations: [VtsToastComponent, VtsToastContainerComponent]
})
export class VtsToastModule {}
