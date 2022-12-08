import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VtsAvatarModule } from '@ui-vts/ng-vts/avatar';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
import { VtsContributorsListComponent } from './contributors-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    VtsIconModule,
    VtsAvatarModule,
    VtsToolTipModule
  ],
  declarations: [VtsContributorsListComponent],
  exports: [VtsContributorsListComponent]
})
export class VtsContributorsListModule {}
