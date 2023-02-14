/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsSplitterItemDirective } from './splitter-item.directive';
import { VtsSplitterComponent } from './splitter.component';

@NgModule({
  declarations: [VtsSplitterComponent, VtsSplitterItemDirective],
  exports: [VtsSplitterComponent, VtsSplitterItemDirective],
  imports: [CommonModule]
})
export class VtsSplitterModule {}
