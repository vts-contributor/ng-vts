/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';

import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsTreeModule } from '@ui-vts/ng-vts/tree';

import { VtsTreeSelectComponent } from './tree-select.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    FormsModule,
    VtsSelectModule,
    VtsTreeModule,
    VtsIconModule,
    VtsEmptyModule,
    VtsOverlayModule,
    VtsNoAnimationModule
  ],
  declarations: [VtsTreeSelectComponent],
  exports: [VtsTreeSelectComponent]
})
export class VtsTreeSelectModule {}
