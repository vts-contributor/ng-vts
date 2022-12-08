/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsAffixComponent } from './affix.component';

@NgModule({
  declarations: [VtsAffixComponent],
  exports: [VtsAffixComponent],
  imports: [BidiModule, CommonModule, PlatformModule]
})
export class VtsAffixModule {}
