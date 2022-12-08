/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsHighlightModule } from '@ui-vts/ng-vts/core/highlight';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';

import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';

import { VtsCascaderOptionComponent } from './cascader-li.component';
import { VtsCascaderComponent } from './cascader.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    OverlayModule,
    VtsOutletModule,
    VtsEmptyModule,
    VtsHighlightModule,
    VtsIconModule,
    VtsInputModule,
    VtsNoAnimationModule,
    VtsOverlayModule
  ],
  declarations: [VtsCascaderComponent, VtsCascaderOptionComponent],
  exports: [VtsCascaderComponent]
})
export class VtsCascaderModule {}
