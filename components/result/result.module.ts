/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import {
  VtsResultContentDirective,
  VtsResultExtraDirective,
  VtsResultIconDirective,
  VtsResultSubtitleDirective,
  VtsResultTitleDirective
} from './result-cells';
import { VtsResultComponent } from './result.component';

import { VtsResultNotFoundComponent } from './partial/not-found';
import { VtsResultServerErrorComponent } from './partial/server-error.component';
import { VtsResultUnauthorizedComponent } from './partial/unauthorized';

const partial = [
  VtsResultNotFoundComponent,
  VtsResultServerErrorComponent,
  VtsResultUnauthorizedComponent
];

const cellDirectives = [
  VtsResultContentDirective,
  VtsResultExtraDirective,
  VtsResultIconDirective,
  VtsResultSubtitleDirective,
  VtsResultTitleDirective
];

@NgModule({
  imports: [BidiModule, CommonModule, VtsOutletModule, VtsIconModule],
  declarations: [VtsResultComponent, ...cellDirectives, ...partial],
  exports: [VtsResultComponent, ...cellDirectives]
})
export class VtsResultModule {}
