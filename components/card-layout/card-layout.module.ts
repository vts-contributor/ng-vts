/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsCardModule } from "@ui-vts/ng-vts/card";
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsCardLayoutDirective } from './card-layout.directive';

@NgModule({
  imports: [CommonModule, VtsOutletModule, VtsCardModule],
  declarations: [
    VtsCardLayoutDirective
  ],
  exports: [
    BidiModule,
    VtsCardLayoutDirective
  ]
})
export class VtsCardLayoutModule {}
