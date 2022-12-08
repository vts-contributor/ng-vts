/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsHighlightPipe } from './highlight.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [VtsHighlightPipe],
  declarations: [VtsHighlightPipe]
})
export class VtsHighlightModule {}
