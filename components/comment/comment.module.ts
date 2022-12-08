/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import {
  VtsCommentActionComponent,
  VtsCommentActionHostDirective,
  VtsCommentAvatarDirective,
  VtsCommentContentDirective
} from './comment-cells';
import { VtsCommentComponent } from './comment.component';

const VTS_COMMENT_CELLS = [
  VtsCommentAvatarDirective,
  VtsCommentContentDirective,
  VtsCommentActionComponent,
  VtsCommentActionHostDirective
];

@NgModule({
  imports: [BidiModule, CommonModule, VtsOutletModule],
  exports: [VtsCommentComponent, ...VTS_COMMENT_CELLS],
  declarations: [VtsCommentComponent, ...VTS_COMMENT_CELLS]
})
export class VtsCommentModule {}
