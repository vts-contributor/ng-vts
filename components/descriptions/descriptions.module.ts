/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsDescriptionsItemComponent } from './descriptions-item.component';
import { VtsDescriptionsComponent } from './descriptions.component';

@NgModule({
  imports: [BidiModule, CommonModule, VtsOutletModule, PlatformModule],
  declarations: [VtsDescriptionsComponent, VtsDescriptionsItemComponent],
  exports: [VtsDescriptionsComponent, VtsDescriptionsItemComponent]
})
export class VtsDescriptionsModule {}
