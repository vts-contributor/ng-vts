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
import { VtsMessageContainerComponent } from './message-container.component';
import { VtsMessageComponent } from './message.component';
import { VtsMessageServiceModule } from './message.service.module';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    VtsIconModule,
    VtsOutletModule,
    VtsMessageServiceModule
  ],
  declarations: [VtsMessageContainerComponent, VtsMessageComponent]
})
export class VtsMessageModule {}
