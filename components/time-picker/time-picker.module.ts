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
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';

import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsTimePickerPanelComponent } from './time-picker-panel.component';
import { VtsTimePickerComponent } from './time-picker.component';

@NgModule({
  declarations: [VtsTimePickerComponent, VtsTimePickerPanelComponent],
  exports: [VtsTimePickerPanelComponent, VtsTimePickerComponent],
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    VtsI18nModule,
    OverlayModule,
    VtsIconModule,
    VtsOverlayModule,
    VtsOutletModule,
    VtsButtonModule
  ]
})
export class VtsTimePickerModule {}
