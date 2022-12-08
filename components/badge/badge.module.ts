/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsBadgeSupComponent } from './badge-sup.component';
import { VtsBadgeComponent } from './badge.component';
import { VtsRibbonComponent } from './ribbon.component';

@NgModule({
  declarations: [VtsBadgeComponent, VtsBadgeSupComponent, VtsRibbonComponent],
  exports: [VtsBadgeComponent, VtsRibbonComponent],
  imports: [BidiModule, CommonModule, ObserversModule, VtsOutletModule]
})
export class VtsBadgeModule {}
