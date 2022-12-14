/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsResizableDirective } from './resizable.directive';
import { VtsResizeHandleComponent } from './resize-handle.component';
import { VtsResizeHandlesComponent } from './resize-handles.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VtsResizableDirective, VtsResizeHandleComponent, VtsResizeHandlesComponent],
  exports: [VtsResizableDirective, VtsResizeHandleComponent, VtsResizeHandlesComponent]
})
export class VtsResizableModule {}
