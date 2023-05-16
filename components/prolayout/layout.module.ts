/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsAvatarModule } from '@ui-vts/ng-vts/avatar';
import { VtsBreadCrumbModule } from '@ui-vts/ng-vts/breadcrumb';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsDividerModule } from '@ui-vts/ng-vts/divider';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsSwitchModule } from '@ui-vts/ng-vts/switch';
import { VtsTagModule } from '@ui-vts/ng-vts/tag';
import { VtsContentComponent } from './content.component';
import { VtsFooterComponent } from './footer.component';
import { VtsHeaderComponent } from './pro-header.component';
import { VtsProLayoutComponent } from './layout.component';
import { VtsProlayoutMenuItemHorizontalComponent } from './menu-item-horizontal.component';
import { VtsProlayoutMenuItemComponent } from './menu-item.component';
import { VtsProLayoutContainerComponent } from './pro-layout.component';
import { VtsSettingDrawerComponent } from './setting-drawer.component';
import { VtsSiderTriggerComponent } from './sider-trigger.component';
import { VtsSiderComponent } from './sider.component';
import { VtsProlayoutBreadCrumbComponent } from './breadcrumb.component';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { OverlayModule } from '@angular/cdk/overlay';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
import { VtsThemeModule } from '@ui-vts/theme/services';
import { RouterModule } from '@angular/router';
import { VtsBadgeModule } from '@ui-vts/ng-vts/badge';
import { VtsBlockUIComponent } from './block-ui.component';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsModalModule } from '@ui-vts/ng-vts/modal';

@NgModule({
  declarations: [
    VtsProLayoutContainerComponent,
    VtsHeaderComponent,
    VtsContentComponent,
    VtsFooterComponent,
    VtsSiderComponent,
    VtsSiderTriggerComponent,
    VtsProLayoutComponent,
    VtsProlayoutMenuItemComponent,
    VtsProlayoutMenuItemHorizontalComponent,
    VtsSettingDrawerComponent,
    VtsProlayoutBreadCrumbComponent,
    VtsBlockUIComponent
  ],
  exports: [VtsProLayoutContainerComponent, VtsFooterComponent],
  imports: [
    BidiModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    VtsIconModule,
    LayoutModule,
    PlatformModule,
    VtsDrawerModule,
    VtsButtonModule,
    VtsSwitchModule,
    FormsModule,
    VtsMenuModule,
    VtsBreadCrumbModule,
    VtsFormModule,
    VtsInputModule,
    VtsAvatarModule,
    VtsDividerModule,
    VtsTagModule,
    VtsGridModule,
    VtsSelectModule,
    VtsDropDownModule,
    VtsNoAnimationModule,
    VtsModalModule,
    VtsOutletModule,
    VtsToolTipModule,
    VtsBadgeModule,
    VtsThemeModule.forRoot({
      themes: [
        {
          theme: 'dark',
          url: '/dark.css'
        },
        {
          theme: 'default',
          url: '/default.css'
        }
      ],
      defaultTheme: 'default'
    })
  ]
})
export class VtsProLayoutModule {}
