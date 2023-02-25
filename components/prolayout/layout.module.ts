/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsBreadCrumbModule } from '../breadcrumb';
import { VtsButtonModule } from '../button';
import { VtsDrawerModule } from '../drawer';
import { VtsMenuModule } from '../menu';
import { VtsSwitchModule } from '../switch';
import { VtsContentComponent } from './content.component';
import { VtsFooterComponent } from './footer.component';
import { VtsHeaderComponent } from './header.component';
import { VtsProLayoutComponent } from './layout.component';
import { VtsProlayoutMenuItemComponent } from './menu-item.component';
import { VtsProLayoutContainerComponent } from './pro-layout.component';
import { VtsSettingDrawerComponent } from './setting-drawer.component';
import { VtsSiderTriggerComponent } from './sider-trigger.component';
import { VtsSiderComponent } from './sider.component';

@NgModule({
  declarations: [
    VtsHeaderComponent,
    VtsContentComponent,
    VtsFooterComponent,
    VtsSiderComponent,
    VtsSiderTriggerComponent,
    VtsProLayoutComponent,
    VtsProLayoutContainerComponent,
    VtsProlayoutMenuItemComponent,
    VtsSettingDrawerComponent
  ],
  exports: [
    VtsProLayoutContainerComponent
  ],
  imports: [
    BidiModule,
    CommonModule,
    VtsIconModule,
    LayoutModule,
    PlatformModule,
    VtsDrawerModule,
    VtsButtonModule,
    VtsSwitchModule,
    FormsModule,
    VtsMenuModule,
    VtsBreadCrumbModule
  ]
})
export class VtsProLayoutModule {}
