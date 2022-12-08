/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibPackerModule } from '@ui-vts/ng-vts/date-picker';

import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsRadioModule } from '@ui-vts/ng-vts/radio';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';

import {
  VtsDateCellDirective,
  VtsDateFullCellDirective,
  VtsMonthCellDirective,
  VtsMonthFullCellDirective
} from './calendar-cells';
import { VtsCalendarHeaderComponent } from './calendar-header.component';
import { VtsCalendarComponent } from './calendar.component';

@NgModule({
  declarations: [
    VtsCalendarHeaderComponent,
    VtsCalendarComponent,
    VtsDateCellDirective,
    VtsDateFullCellDirective,
    VtsMonthCellDirective,
    VtsMonthFullCellDirective
  ],
  exports: [
    VtsCalendarComponent,
    VtsDateCellDirective,
    VtsDateFullCellDirective,
    VtsMonthCellDirective,
    VtsMonthFullCellDirective
  ],
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    VtsI18nModule,
    VtsRadioModule,
    VtsSelectModule,
    LibPackerModule
  ]
})
export class VtsCalendarModule {}
