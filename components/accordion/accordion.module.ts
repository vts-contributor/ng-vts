/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsAccordionPanelComponent } from './accordion-panel.component';
import { VtsAccordionComponent } from './accordion.component';

@NgModule({
  declarations: [VtsAccordionPanelComponent, VtsAccordionComponent],
  exports: [VtsAccordionPanelComponent, VtsAccordionComponent],
  imports: [BidiModule, CommonModule, VtsIconModule, VtsOutletModule, VtsNoAnimationModule]
})
export class VtsAccordionModule {}
