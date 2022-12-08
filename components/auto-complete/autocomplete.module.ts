/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsInputModule } from '@ui-vts/ng-vts/input';

import { VtsAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
import { VtsAutocompleteOptionComponent } from './autocomplete-option.component';
import { VtsAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { VtsAutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [
    VtsAutocompleteComponent,
    VtsAutocompleteOptionComponent,
    VtsAutocompleteTriggerDirective,
    VtsAutocompleteOptgroupComponent
  ],
  exports: [
    VtsAutocompleteComponent,
    VtsAutocompleteOptionComponent,
    VtsAutocompleteTriggerDirective,
    VtsAutocompleteOptgroupComponent
  ],
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    FormsModule,
    VtsOutletModule,
    VtsNoAnimationModule,
    VtsInputModule
  ]
})
export class VtsAutocompleteModule {}
