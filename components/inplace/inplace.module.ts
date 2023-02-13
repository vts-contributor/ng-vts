import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';

import { VtsInplaceComponent } from './inplace.component';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsInplaceCollapseComponent } from './inplace-collapse.component';
import { VtsInplacePlaceholderComponent } from './inplace-placeholder.component';

@NgModule({
  imports: [CommonModule, VtsOutletModule, VtsIconModule, VtsButtonModule, VtsTypographyModule],
  declarations: [VtsInplaceComponent, VtsInplaceCollapseComponent, VtsInplacePlaceholderComponent],
  exports: [
    BidiModule,
    VtsInplaceComponent,
    VtsInplaceCollapseComponent,
    VtsInplacePlaceholderComponent
  ]
})
export class VtsInplaceModule {}
