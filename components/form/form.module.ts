/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsFormControlComponent } from './form-control.component';
import { VtsFormItemComponent } from './form-item.component';
import { VtsFormLabelComponent } from './form-label.component';
import { VtsFormSplitComponent } from './form-split.component';
import { VtsFormTextComponent } from './form-text.component';
import { VtsFormDirective } from './form.directive';

@NgModule({
  declarations: [
    VtsFormDirective,
    VtsFormItemComponent,
    VtsFormLabelComponent,
    VtsFormControlComponent,
    VtsFormTextComponent,
    VtsFormSplitComponent
  ],
  exports: [
    VtsGridModule,
    VtsFormDirective,
    VtsFormItemComponent,
    VtsFormLabelComponent,
    VtsFormControlComponent,
    VtsFormTextComponent,
    VtsFormSplitComponent
  ],
  imports: [
    BidiModule,
    CommonModule,
    VtsGridModule,
    VtsIconModule,
    VtsToolTipModule,
    LayoutModule,
    PlatformModule,
    VtsOutletModule
  ]
})
export class VtsFormModule {}
