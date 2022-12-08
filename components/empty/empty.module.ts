/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';

import { VtsEmbedEmptyComponent } from './embed-empty.component';
import { VtsEmptyComponent } from './empty.component';
import { VtsEmptyDefaultComponent } from './partial/default';
import { VtsEmptySimpleComponent } from './partial/simple';

@NgModule({
  imports: [BidiModule, CommonModule, PortalModule, VtsOutletModule, VtsI18nModule],
  declarations: [
    VtsEmptyComponent,
    VtsEmbedEmptyComponent,
    VtsEmptyDefaultComponent,
    VtsEmptySimpleComponent
  ],
  exports: [VtsEmptyComponent, VtsEmbedEmptyComponent]
})
export class VtsEmptyModule {}
