import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VtsAlertModule } from '@ui-vts/ng-vts/alert';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsPopoverModule } from '@ui-vts/ng-vts/popover';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsMessageModule } from '@ui-vts/ng-vts/message';

import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation.component';
import { SearchbarComponent } from './searchbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    VtsGridModule,
    VtsIconModule,
    VtsInputModule,
    VtsMenuModule,
    VtsSelectModule,
    VtsButtonModule,
    VtsDropDownModule,
    VtsPopoverModule,
    VtsAlertModule,
    VtsMessageModule
  ],
  declarations: [HeaderComponent, SearchbarComponent, NavigationComponent],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {}
