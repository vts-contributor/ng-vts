/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsAvatarModule } from '@ui-vts/ng-vts/avatar';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';

import {
  VtsListEmptyComponent,
  VtsListFooterComponent,
  VtsListGridDirective,
  VtsListHeaderComponent,
  VtsListLoadMoreDirective,
  VtsListPaginationComponent
} from './list-cell';
import {
  VtsListItemActionComponent,
  VtsListItemActionsComponent,
  VtsListItemExtraComponent
} from './list-item-cell';
import {
  VtsListItemMetaAvatarComponent,
  VtsListItemMetaDescriptionComponent,
  VtsListItemMetaTitleComponent
} from './list-item-meta-cell';
import { VtsListItemMetaComponent } from './list-item-meta.component';
import { VtsListItemComponent } from './list-item.component';
import { VtsListComponent } from './list.component';

const DIRECTIVES = [
  VtsListComponent,
  VtsListHeaderComponent,
  VtsListFooterComponent,
  VtsListPaginationComponent,
  VtsListEmptyComponent,
  VtsListItemComponent,
  VtsListItemMetaComponent,
  VtsListItemMetaTitleComponent,
  VtsListItemMetaDescriptionComponent,
  VtsListItemMetaAvatarComponent,
  VtsListItemActionsComponent,
  VtsListItemActionComponent,
  VtsListItemExtraComponent,
  VtsListLoadMoreDirective,
  VtsListGridDirective
];

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    VtsSpinModule,
    VtsGridModule,
    VtsAvatarModule,
    VtsOutletModule,
    VtsEmptyModule
  ],
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class VtsListModule {}
