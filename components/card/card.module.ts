/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsImageModule } from '@ui-vts/ng-vts/image';
import { VtsCardFooterComponent } from './card-footer.component';

import {
  VtsCardHeaderComponent,
  VtsCardHeaderExtraComponent,
  VtsCardHeaderTitleComponent
} from './card-header.component';
import { VtsCardLoadingComponent } from './card-loading.component';
import {
  VtsCardMetaAvatarComponent,
  VtsCardMetaComponent,
  VtsCardMetaDescriptionComponent,
  VtsCardMetaTitleComponent
} from './card-meta.component';
import { VtsCardThumbnailComponent } from './card-thumbnail.component';
import { VtsCardComponent } from './card.component';
import { VtsCardBodyComponent } from './card-body.component';

@NgModule({
  imports: [CommonModule, VtsOutletModule, VtsTypographyModule, VtsImageModule, VtsIconModule],
  declarations: [
    VtsCardComponent,
    VtsCardLoadingComponent,
    VtsCardThumbnailComponent,
    VtsCardHeaderComponent,
    VtsCardHeaderTitleComponent,
    VtsCardHeaderExtraComponent,
    VtsCardBodyComponent,
    VtsCardMetaComponent,
    VtsCardMetaAvatarComponent,
    VtsCardMetaDescriptionComponent,
    VtsCardMetaTitleComponent,
    VtsCardFooterComponent
  ],
  exports: [
    BidiModule,
    VtsCardComponent,
    VtsCardLoadingComponent,

    VtsTypographyModule,
    VtsCardThumbnailComponent,
    VtsCardHeaderComponent,
    VtsCardHeaderTitleComponent,
    VtsCardHeaderExtraComponent,
    VtsCardBodyComponent,
    VtsCardMetaComponent,
    VtsCardMetaAvatarComponent,
    VtsCardMetaDescriptionComponent,
    VtsCardMetaTitleComponent,
    VtsCardFooterComponent
  ]
})
export class VtsCardModule {}
