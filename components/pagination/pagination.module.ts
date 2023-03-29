/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsPaginationDefaultComponent } from './pagination-default.component';
import { VtsPaginationItemComponent } from './pagination-item.component';
import { VtsPaginationOptionsComponent } from './pagination-options.component';
import { VtsPaginationSimpleComponent } from './pagination-simple.component';
import { VtsPaginationComponent } from './pagination.component';
import {
  ChevronLeft,
  ChevronRight,
  DoubleArrowLeft,
  DoubleArrowRight
} from '@ui-vts/icons-angular/icons/radix';

const icons = [ChevronLeft, ChevronRight, DoubleArrowLeft, DoubleArrowRight];
@NgModule({
  declarations: [
    VtsPaginationComponent,
    VtsPaginationSimpleComponent,
    VtsPaginationOptionsComponent,
    VtsPaginationItemComponent,
    VtsPaginationDefaultComponent
  ],
  exports: [VtsPaginationComponent],
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    VtsSelectModule,
    VtsI18nModule,
    VtsIconModule.forChild(icons)
  ]
})
export class VtsPaginationModule {}
