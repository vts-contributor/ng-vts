/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsBreadCrumbItemComponent } from './breadcrumb-item.component';
import { VtsBreadCrumbSeparatorComponent } from './breadcrumb-separator.component';
import { VtsBreadCrumbComponent } from './breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    VtsOutletModule,
    OverlayModule,
    VtsOverlayModule,
    VtsDropDownModule,
    VtsIconModule
  ],
  declarations: [
    VtsBreadCrumbComponent,
    VtsBreadCrumbItemComponent,
    VtsBreadCrumbSeparatorComponent
  ],
  exports: [
    BidiModule,
    VtsBreadCrumbComponent,
    VtsBreadCrumbItemComponent,
    VtsBreadCrumbSeparatorComponent
  ]
})
export class VtsBreadCrumbModule {}
