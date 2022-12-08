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
  VtsPageHeaderAvatarDirective,
  VtsPageHeaderBreadcrumbDirective,
  VtsPageHeaderContentDirective,
  VtsPageHeaderExtraDirective,
  VtsPageHeaderFooterDirective,
  VtsPageHeaderSubtitleDirective,
  VtsPageHeaderTagDirective,
  VtsPageHeaderTitleDirective
} from './page-header-cells';
import { VtsPageHeaderComponent } from './page-header.component';

const VtsPageHeaderCells = [
  VtsPageHeaderTitleDirective,
  VtsPageHeaderSubtitleDirective,
  VtsPageHeaderContentDirective,
  VtsPageHeaderTagDirective,
  VtsPageHeaderExtraDirective,
  VtsPageHeaderFooterDirective,
  VtsPageHeaderBreadcrumbDirective,
  VtsPageHeaderAvatarDirective
];

@NgModule({
  imports: [BidiModule, CommonModule, VtsOutletModule, VtsIconModule],
  exports: [VtsPageHeaderComponent, VtsPageHeaderCells],
  declarations: [VtsPageHeaderComponent, VtsPageHeaderCells]
})
export class VtsPageHeaderModule {}
