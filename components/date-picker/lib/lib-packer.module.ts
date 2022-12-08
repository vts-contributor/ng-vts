/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * A collection module of standard output for all lib components
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsTimePickerModule } from '@ui-vts/ng-vts/time-picker';
import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { DecadeHeaderComponent } from './decade-header.component';
import { DecadeTableComponent } from './decade-table.component';
import { MonthHeaderComponent } from './month-header.component';
import { MonthTableComponent } from './month-table.component';
import { YearHeaderComponent } from './year-header.component';
import { YearTableComponent } from './year-table.component';

@NgModule({
  imports: [CommonModule, FormsModule, VtsI18nModule, VtsTimePickerModule, VtsOutletModule],
  exports: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent
  ],
  declarations: [
    DateHeaderComponent,
    DateTableComponent,
    DecadeHeaderComponent,
    DecadeTableComponent,
    MonthHeaderComponent,
    MonthTableComponent,
    YearHeaderComponent,
    YearTableComponent
  ]
})
export class LibPackerModule {}
