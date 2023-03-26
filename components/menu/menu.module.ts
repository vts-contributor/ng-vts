/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsMenuGroupComponent } from './menu-group.component';
import { VtsMenuItemDirective } from './menu-item.directive';
import { VtsMenuDirective } from './menu.directive';
import { VtsSubmenuInlineChildComponent } from './submenu-inline-child.component';
import { VtsSubmenuNoneInlineChildComponent } from './submenu-non-inline-child.component';
import { VtsSubMenuTitleComponent } from './submenu-title.component';
import { VtsSubMenuComponent } from './submenu.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    PlatformModule,
    OverlayModule,
    VtsIconModule,
    VtsNoAnimationModule,
    VtsOutletModule,
    VtsToolTipModule
  ],
  declarations: [
    VtsMenuDirective,
    VtsMenuItemDirective,
    VtsSubMenuComponent,
    VtsMenuGroupComponent,
    VtsSubMenuTitleComponent,
    VtsSubmenuInlineChildComponent,
    VtsSubmenuNoneInlineChildComponent
  ],
  exports: [VtsMenuDirective, VtsMenuItemDirective, VtsSubMenuComponent, VtsMenuGroupComponent]
})
export class VtsMenuModule {}
