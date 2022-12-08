/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';

import { VtsCodeEditorComponent } from './code-editor.component';

@NgModule({
  declarations: [VtsCodeEditorComponent],
  imports: [CommonModule, VtsIconModule, VtsSpinModule],
  exports: [VtsCodeEditorComponent]
})
export class VtsCodeEditorModule {}
