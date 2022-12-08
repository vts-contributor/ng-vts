/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { VtsResizeObserverModule } from '@ui-vts/ng-vts/cdk/resize-observer';

import { VtsOverflowContainerComponent } from './overflow-container.component';
import { VtsOverflowItemDirective } from './overflow-item.directive';
import { VtsOverflowRestDirective } from './overflow-rest.directive';
import { VtsOverflowSuffixDirective } from './overflow-suffix.directive';

@NgModule({
  imports: [VtsResizeObserverModule],
  declarations: [
    VtsOverflowContainerComponent,
    VtsOverflowItemDirective,
    VtsOverflowRestDirective,
    VtsOverflowSuffixDirective
  ],
  exports: [
    VtsOverflowContainerComponent,
    VtsOverflowItemDirective,
    VtsOverflowRestDirective,
    VtsOverflowSuffixDirective
  ]
})
export class VtsOverflowModule {}
