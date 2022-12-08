/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';

import { VtsI18nPipe } from './vts-i18n.pipe';

@NgModule({
  declarations: [VtsI18nPipe],
  exports: [VtsI18nPipe]
})
export class VtsI18nModule {}
