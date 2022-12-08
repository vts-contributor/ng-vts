/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';

import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsTimePickerModule } from '@ui-vts/ng-vts/time-picker';
import { CalendarFooterComponent } from './calendar-footer.component';

import { VtsDatePickerComponent } from './date-picker.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { InnerPopupComponent } from './inner-popup.component';

import { LibPackerModule } from './lib/lib-packer.module';
import { VtsMonthPickerComponent } from './month-picker.component';
import { VtsPickerComponent } from './picker.component';
import { VtsRangePickerMultipleComponent } from './range-picker-multiple.component';
import { VtsRangePickerSingleComponent } from './range-picker-single.component';
import { VtsRangePickerComponent } from './range-picker.component';
import { VtsWeekPickerComponent } from './week-picker.component';
import { VtsYearPickerComponent } from './year-picker.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    OverlayModule,
    LibPackerModule,
    VtsIconModule,
    VtsOverlayModule,
    VtsNoAnimationModule,
    VtsOutletModule,
    VtsTimePickerModule,
    VtsButtonModule,
    LibPackerModule,
    VtsGridModule
  ],
  exports: [
    VtsDatePickerComponent,
    VtsRangePickerComponent,
    VtsRangePickerSingleComponent,
    VtsRangePickerMultipleComponent,
    VtsMonthPickerComponent,
    VtsYearPickerComponent,
    VtsWeekPickerComponent
  ],
  declarations: [
    VtsPickerComponent,
    VtsDatePickerComponent,
    VtsMonthPickerComponent,
    VtsYearPickerComponent,
    VtsWeekPickerComponent,
    VtsRangePickerComponent,
    VtsRangePickerSingleComponent,
    VtsRangePickerMultipleComponent,
    CalendarFooterComponent,
    InnerPopupComponent,
    DateRangePopupComponent
  ]
})
export class VtsDatePickerModule {}
