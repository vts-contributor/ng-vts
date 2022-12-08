/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsTimelineItemComponent } from './timeline-item.component';
import { VtsTimelineComponent } from './timeline.component';

@NgModule({
  declarations: [VtsTimelineItemComponent, VtsTimelineComponent],
  exports: [VtsTimelineItemComponent, VtsTimelineComponent],
  imports: [BidiModule, CommonModule, PlatformModule, VtsIconModule, VtsOutletModule]
})
export class VtsTimelineModule {}
