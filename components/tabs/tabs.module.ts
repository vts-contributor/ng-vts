/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsTabAddButtonComponent } from './tab-add-button.component';
import { VtsTabBodyComponent } from './tab-body.component';
import { VtsTabCloseButtonComponent } from './tab-close-button.component';
import { VtsTabLinkDirective, VtsTabLinkTemplateDirective } from './tab-link.directive';
import { VtsTabNavBarComponent } from './tab-nav-bar.component';
import { VtsTabNavItemDirective } from './tab-nav-item.directive';
import { VtsTabNavOperationComponent } from './tab-nav-operation.component';
import { VtsTabScrollListDirective } from './tab-scroll-list.directive';
import { VtsTabComponent } from './tab.component';
import { VtsTabDirective } from './tab.directive';
import { VtsTabsInkBarDirective } from './tabs-ink-bar.directive';
import { VtsTabSetComponent } from './tabset.component';

const DIRECTIVES = [
  VtsTabSetComponent,
  VtsTabComponent,
  VtsTabNavBarComponent,
  VtsTabNavItemDirective,
  VtsTabsInkBarDirective,
  VtsTabScrollListDirective,
  VtsTabNavOperationComponent,
  VtsTabAddButtonComponent,
  VtsTabCloseButtonComponent,
  VtsTabDirective,
  VtsTabBodyComponent,
  VtsTabLinkDirective,
  VtsTabLinkTemplateDirective
];

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES],
  imports: [
    BidiModule,
    CommonModule,
    ObserversModule,
    VtsIconModule,
    VtsOutletModule,
    PlatformModule,
    A11yModule,
    CdkScrollableModule,
    VtsDropDownModule
  ]
})
export class VtsTabsModule {}
