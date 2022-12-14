/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsSpaceItemDirective } from './space-item.directive';
import { VtsSpaceComponent } from './space.component';

@NgModule({
  declarations: [VtsSpaceComponent, VtsSpaceItemDirective],
  exports: [VtsSpaceComponent, VtsSpaceItemDirective],
  imports: [BidiModule, CommonModule]
})
export class VtsSpaceModule {}
