/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsCardGridDirective } from './card-grid.directive';
import { VtsCardGroupComponent } from './card-group.component';
import { VtsCardHeaderComponent, VtsCardHeaderExtraComponent, VtsCardHeaderTitleComponent } from './card-header.component';
import { VtsCardLoadingComponent } from './card-loading.component';
import { VtsCardMetaComponent } from './card-meta.component';
import { VtsCardTabComponent } from './card-tab.component';
import { VtsCardThumbnailComponent } from './card-thumbnail.component';
import { VtsCardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, VtsOutletModule],
  declarations: [
    VtsCardComponent,
    VtsCardGridDirective,
    VtsCardMetaComponent,
    VtsCardLoadingComponent,
    VtsCardTabComponent,
    VtsCardGroupComponent,

    VtsCardThumbnailComponent,
    VtsCardHeaderComponent,
    VtsCardHeaderTitleComponent,
    VtsCardHeaderExtraComponent,
  ],
  exports: [
    BidiModule,
    VtsCardComponent,
    VtsCardGridDirective,
    VtsCardMetaComponent,
    VtsCardLoadingComponent,
    VtsCardTabComponent,
    VtsCardGroupComponent,
    
    VtsCardThumbnailComponent,
    VtsCardHeaderComponent,
    VtsCardHeaderTitleComponent,
    VtsCardHeaderExtraComponent,
  ]
})
export class VtsCardModule {}
