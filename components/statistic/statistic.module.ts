/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsPipesModule as VtsPipesModuleFromCore } from '@ui-vts/ng-vts/core/pipe';

import { VtsCountdownComponent } from './countdown.component';
import { VtsStatisticNumberComponent } from './statistic-number.component';
import { VtsStatisticComponent } from './statistic.component';

@NgModule({
  imports: [BidiModule, CommonModule, PlatformModule, VtsOutletModule, VtsPipesModuleFromCore],
  declarations: [VtsStatisticComponent, VtsCountdownComponent, VtsStatisticNumberComponent],
  exports: [VtsStatisticComponent, VtsCountdownComponent, VtsStatisticNumberComponent]
})
export class VtsStatisticModule {}
