/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgModule } from '@angular/core';
import { IconDefinition } from '@ui-vts/icons-angular';
import * as AllIcons from '@ui-vts/icons-angular/icons';

import { VtsIconModule, VTS_ICONS } from '@ui-vts/ng-vts/icon';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  const i = antDesignIcons[key];
  return i;
});

/**
 * Include this module in every testing spec, except `icon.spec.ts`.
 */
// @dynamic
@NgModule({
  exports: [VtsIconModule],
  providers: [
    {
      provide: VTS_ICONS,
      useValue: icons
    }
  ]
})
export class VtsIconTestModule {}
