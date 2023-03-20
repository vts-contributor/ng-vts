/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsPipesModule } from '@ui-vts/ng-vts/pipes';

import { VtsImageGroupComponent } from './image-group.component';
import { VtsImagePreviewComponent } from './image-preview.component';
import { VtsImageDirective } from './image.directive';
import { VtsImageService } from './image.service';

@NgModule({
  imports: [
    BidiModule,
    OverlayModule,
    PortalModule,
    DragDropModule,
    CommonModule,
    VtsIconModule,
    VtsPipesModule
  ],
  exports: [VtsImageDirective, VtsImagePreviewComponent, VtsImageGroupComponent],
  providers: [VtsImageService],
  declarations: [VtsImageDirective, VtsImagePreviewComponent, VtsImageGroupComponent]
})
export class VtsImageModule {}
