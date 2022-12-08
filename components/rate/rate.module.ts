/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsRateItemComponent } from './rate-item.component';
import { VtsRateComponent } from './rate.component';

@NgModule({
  exports: [VtsRateComponent],
  declarations: [VtsRateComponent, VtsRateItemComponent],
  imports: [BidiModule, CommonModule, VtsIconModule, VtsToolTipModule]
})
export class VtsRateModule {}
