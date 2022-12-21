/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/@ui-vts/ng-vts/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsTypographyDirective } from './typography.directive';

@NgModule({
  imports: [CommonModule, VtsOutletModule],
  declarations: [VtsTypographyDirective],
  exports: [VtsTypographyDirective]
})
export class VtsTypographyModule {}
