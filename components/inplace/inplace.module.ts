/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';

import { VtsInplaceComponent } from './inplace.component';
import { VtsInplaceDisplayComponent } from './inplace-display.component';
import { VtsInplaceContentComponent } from './inplace-content.component';

@NgModule({
  imports: [
    CommonModule,
    VtsOutletModule,
    OverlayModule,
    VtsOverlayModule,
    VtsDropDownModule,
    VtsIconModule,
    VtsButtonModule
  ],
  declarations: [VtsInplaceComponent, VtsInplaceDisplayComponent, VtsInplaceContentComponent],
  exports: [BidiModule, VtsInplaceComponent, VtsInplaceDisplayComponent, VtsInplaceContentComponent]
})
export class VtsInplaceModule {}
