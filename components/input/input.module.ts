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

import { VtsAutosizeDirective } from './autosize.directive';
import { VtsInputGroupSlotComponent } from './input-group-slot.component';
import {
  VtsInputGroupComponent,
  VtsInputGroupWhitSuffixOrPrefixDirective
} from './input-group.component';
import { VtsInputDirective } from './input.directive';
import { VtsTextareaCountComponent } from './textarea-count.component';

@NgModule({
  declarations: [
    VtsTextareaCountComponent,
    VtsInputDirective,
    VtsInputGroupComponent,
    VtsAutosizeDirective,
    VtsInputGroupSlotComponent,
    VtsInputGroupWhitSuffixOrPrefixDirective
  ],
  exports: [
    VtsTextareaCountComponent,
    VtsInputDirective,
    VtsInputGroupComponent,
    VtsAutosizeDirective,
    VtsInputGroupWhitSuffixOrPrefixDirective
  ],
  imports: [BidiModule, CommonModule, VtsIconModule, PlatformModule, VtsOutletModule]
})
export class VtsInputModule {}
