/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';

import { VtsTransferListComponent } from './transfer-list.component';
import { VtsTransferSearchComponent } from './transfer-search.component';
import { VtsTransferComponent } from './transfer.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    VtsCheckboxModule,
    VtsButtonModule,
    VtsInputModule,
    VtsI18nModule,
    VtsIconModule,
    VtsEmptyModule
  ],
  declarations: [VtsTransferComponent, VtsTransferListComponent, VtsTransferSearchComponent],
  exports: [VtsTransferComponent]
})
export class VtsTransferModule {}
