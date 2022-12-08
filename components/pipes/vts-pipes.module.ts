/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsAggregatePipe } from './vts-aggregate.pipe';
import { VtsBytesPipe } from './vts-bytes.pipe';
import { VtsToCssUnitPipe } from './vts-css-unit.pipe';
import { VtsEllipsisPipe } from './vts-ellipsis.pipe';
import { VtsSafeNullPipe } from './vts-safe-null.pipe';
import { VtsSanitizerPipe } from './vts-sanitizer.pipe';
import { VtsTrimPipe } from './vts-trim.pipe';

const pipes = [
  VtsToCssUnitPipe,
  VtsSafeNullPipe,
  VtsSanitizerPipe,
  VtsTrimPipe,
  VtsBytesPipe,
  VtsAggregatePipe,
  VtsEllipsisPipe
];

@NgModule({
  imports: [CommonModule],
  exports: [pipes],
  declarations: [pipes]
})
export class VtsPipesModule {}
