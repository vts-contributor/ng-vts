/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsAvatarGroupComponent } from './avatar-group.component';
import { VtsAvatarComponent } from './avatar.component';

@NgModule({
  declarations: [VtsAvatarComponent, VtsAvatarGroupComponent],
  exports: [VtsAvatarComponent, VtsAvatarGroupComponent],
  imports: [BidiModule, CommonModule, VtsIconModule, PlatformModule]
})
export class VtsAvatarModule {}
