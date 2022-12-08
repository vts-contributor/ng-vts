/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { VtsResizeObserverDirective } from './resize-observer.directive';
import { VtsResizeObserverFactory } from './resize-observer.service';

@NgModule({
  providers: [VtsResizeObserverFactory],
  declarations: [VtsResizeObserverDirective],
  exports: [VtsResizeObserverDirective]
})
export class VtsResizeObserverModule {}
