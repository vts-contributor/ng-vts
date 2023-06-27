/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsProgressModule } from '@ui-vts/ng-vts/progress';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
import { VtsFileSizeConvert } from './file-size-convert';

import { VtsUploadBtnComponent } from './upload-btn.component';
import { VtsUploadListComponent } from './upload-list.component';
import { VtsUploadComponent } from './upload.component';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    FormsModule,
    PlatformModule,
    VtsToolTipModule,
    VtsProgressModule,
    VtsI18nModule,
    VtsIconModule,
    VtsButtonModule,
    VtsSpaceModule
  ],
  declarations: [
    VtsUploadComponent,
    VtsUploadBtnComponent,
    VtsUploadListComponent,
    VtsFileSizeConvert
  ],
  exports: [VtsUploadComponent]
})
export class VtsUploadModule { }
