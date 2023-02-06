import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsCardModule } from '@ui-vts/ng-vts/card';
import { VtsPanelComponent } from './panel.component';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';

@NgModule({
  declarations: [VtsPanelComponent],
  exports: [VtsPanelComponent],
  imports: [
    BidiModule,
    CommonModule,
    VtsCardModule,
    VtsButtonModule,
    VtsIconModule,
    VtsOutletModule,
    VtsNoAnimationModule
  ]
})
export class VtsPanelModule {}
