/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsCheckboxGroupComponent } from './checkbox-group.component';
import { VtsCheckboxWrapperComponent } from './checkbox-wrapper.component';
import { VtsCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [BidiModule, CommonModule, FormsModule, A11yModule],
  declarations: [VtsCheckboxComponent, VtsCheckboxGroupComponent, VtsCheckboxWrapperComponent],
  exports: [VtsCheckboxComponent, VtsCheckboxGroupComponent, VtsCheckboxWrapperComponent]
})
export class VtsCheckboxModule {}
