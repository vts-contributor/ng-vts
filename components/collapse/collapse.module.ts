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

import { VtsCollapsePanelComponent } from './collapse-panel.component';
import { VtsCollapseComponent } from './collapse.component';

@NgModule({
  declarations: [VtsCollapsePanelComponent, VtsCollapseComponent],
  exports: [VtsCollapsePanelComponent, VtsCollapseComponent],
  imports: [BidiModule, CommonModule, VtsIconModule, VtsOutletModule, VtsNoAnimationModule]
})
export class VtsCollapseModule {}
