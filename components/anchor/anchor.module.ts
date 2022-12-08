/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsAffixModule } from '@ui-vts/ng-vts/affix';

import { VtsAnchorLinkComponent } from './anchor-link.component';
import { VtsAnchorComponent } from './anchor.component';

@NgModule({
  declarations: [VtsAnchorComponent, VtsAnchorLinkComponent],
  exports: [VtsAnchorComponent, VtsAnchorLinkComponent],
  imports: [BidiModule, CommonModule, VtsAffixModule, PlatformModule]
})
export class VtsAnchorModule {}
