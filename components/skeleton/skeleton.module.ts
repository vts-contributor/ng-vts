/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  VtsSkeletonElementAvatarComponent,
  VtsSkeletonElementButtonComponent,
  VtsSkeletonElementDirective,
  VtsSkeletonElementImageComponent,
  VtsSkeletonElementInputComponent
} from './skeleton-element.component';
import { VtsSkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [
    VtsSkeletonComponent,
    VtsSkeletonElementDirective,
    VtsSkeletonElementButtonComponent,
    VtsSkeletonElementAvatarComponent,
    VtsSkeletonElementImageComponent,
    VtsSkeletonElementInputComponent
  ],
  imports: [BidiModule, CommonModule],
  exports: [
    VtsSkeletonComponent,
    VtsSkeletonElementDirective,
    VtsSkeletonElementButtonComponent,
    VtsSkeletonElementAvatarComponent,
    VtsSkeletonElementImageComponent,
    VtsSkeletonElementInputComponent
  ]
})
export class VtsSkeletonModule {}
