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
  VtsResultActionDirective,
  VtsResultIconDirective,
  VtsResultSubtitleDirective,
  VtsResultTitleDirective
} from './result-cells';
import { VtsResultComponent } from './result.component';

import { VtsResult403Component } from './partial/403';
import { VtsResult404Component } from './partial/404';
import { VtsResult500Component } from './partial/500';
import { VtsResultBadConnectionComponent } from './partial/bad-connection';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';

const partial = [
  VtsResult403Component,
  VtsResult404Component,
  VtsResult500Component,
  VtsResultBadConnectionComponent
];

const cellDirectives = [
  VtsResultContentDirective,
  VtsResultActionDirective,
  VtsResultIconDirective,
  VtsResultSubtitleDirective,
  VtsResultTitleDirective
];

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    VtsOutletModule,
    VtsIconModule,
    VtsButtonModule,
    VtsGridModule
  ],
  declarations: [VtsResultComponent, ...cellDirectives, ...partial],
  exports: [VtsResultComponent, ...cellDirectives]
})
export class VtsResultModule {}
