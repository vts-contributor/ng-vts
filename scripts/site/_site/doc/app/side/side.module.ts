import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideComponent } from './side.component';
import { LogoComponent } from './logo.component';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    VtsMenuModule,
    VtsIconModule
  ],
  declarations: [SideComponent, LogoComponent],
  exports: [SideComponent]
})
export class SideModule {}
