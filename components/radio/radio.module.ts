/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VtsRadioButtonDirective } from './radio-button.directive';
import { VtsRadioGroupComponent } from './radio-group.component';
import { VtsRadioComponent } from './radio.component';

@NgModule({
  imports: [BidiModule, CommonModule, FormsModule],
  exports: [VtsRadioComponent, VtsRadioButtonDirective, VtsRadioGroupComponent],
  declarations: [VtsRadioComponent, VtsRadioButtonDirective, VtsRadioGroupComponent]
})
export class VtsRadioModule {}
