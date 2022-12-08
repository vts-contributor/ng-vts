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
import { VtsNotificationContainerComponent } from './notification-container.component';
import { VtsNotificationComponent } from './notification.component';
import { VtsNotificationServiceModule } from './notification.service.module';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    VtsIconModule,
    VtsOutletModule,
    VtsNotificationServiceModule
  ],
  declarations: [VtsNotificationComponent, VtsNotificationContainerComponent],
  entryComponents: [VtsNotificationContainerComponent]
})
export class VtsNotificationModule {}
