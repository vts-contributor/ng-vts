/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsPipesModule } from '@ui-vts/ng-vts/pipes';

import { VtsModalCloseComponent } from './modal-close.component';
import { VtsModalConfirmContainerComponent } from './modal-confirm-container.component';
import { VtsModalContainerComponent } from './modal-container.component';
import { VtsModalContentDirective } from './modal-content.directive';
import { VtsModalFooterComponent } from './modal-footer.component';
import { VtsModalFooterDirective } from './modal-footer.directive';
import { VtsModalTitleComponent } from './modal-title.component';
import { VtsModalTitleDirective } from './modal-title.directive';
import { VtsModalComponent } from './modal.component';
import { VtsModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    BidiModule,
    OverlayModule,
    VtsOutletModule,
    PortalModule,
    VtsI18nModule,
    VtsButtonModule,
    VtsIconModule,
    VtsPipesModule,
    VtsNoAnimationModule,
    VtsPipesModule
  ],
  exports: [
    VtsModalComponent,
    VtsModalFooterDirective,
    VtsModalContentDirective,
    VtsModalTitleDirective
  ],
  providers: [VtsModalService],
  declarations: [
    VtsModalComponent,
    VtsModalFooterDirective,
    VtsModalContentDirective,
    VtsModalCloseComponent,
    VtsModalFooterComponent,
    VtsModalTitleComponent,
    VtsModalTitleDirective,
    VtsModalContainerComponent,
    VtsModalConfirmContainerComponent,
    VtsModalComponent
  ]
})
export class VtsModalModule {}
