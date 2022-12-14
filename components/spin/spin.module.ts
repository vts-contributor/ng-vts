/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSpinComponent } from './spin.component';

@NgModule({
  exports: [VtsSpinComponent],
  declarations: [VtsSpinComponent],
  imports: [BidiModule, CommonModule, ObserversModule, VtsIconModule]
})
export class VtsSpinModule {}
