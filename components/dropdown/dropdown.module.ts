/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsContextMenuServiceModule } from './context-menu.service.module';
import { VtsDropDownADirective } from './dropdown-a.directive';
import { VtsDropdownButtonDirective } from './dropdown-button.directive';
import { VtsDropdownMenuComponent } from './dropdown-menu.component';
import { VtsDropDownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    FormsModule,
    VtsButtonModule,
    VtsMenuModule,
    VtsIconModule,
    VtsNoAnimationModule,
    PlatformModule,
    VtsOverlayModule,
    VtsContextMenuServiceModule,
    VtsOutletModule
  ],
  declarations: [
    VtsDropDownDirective,
    VtsDropDownADirective,
    VtsDropdownMenuComponent,
    VtsDropdownButtonDirective
  ],
  exports: [
    VtsMenuModule,
    VtsDropDownDirective,
    VtsDropDownADirective,
    VtsDropdownMenuComponent,
    VtsDropdownButtonDirective
  ]
})
export class VtsDropDownModule {}
