import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsNavBottomComponent } from './nav-bottom.component';

@NgModule({
  imports: [CommonModule, RouterModule, VtsIconModule],
  declarations: [VtsNavBottomComponent],
  exports: [VtsNavBottomComponent]
})
export class VtsNavBottomModule {}
