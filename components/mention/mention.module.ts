/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsMentionSuggestionDirective } from './mention-suggestions';
import { VtsMentionTriggerDirective } from './mention-trigger';
import { VtsMentionComponent } from './mention.component';

const COMPONENTS = [VtsMentionComponent, VtsMentionTriggerDirective, VtsMentionSuggestionDirective];

@NgModule({
  imports: [BidiModule, CommonModule, FormsModule, OverlayModule, VtsIconModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class VtsMentionModule {}
