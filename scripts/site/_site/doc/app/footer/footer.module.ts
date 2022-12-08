import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsPopoverModule } from '@ui-vts/ng-vts/popover';
import { ColorSketchModule } from 'ngx-color/sketch';
import { FooterColComponent } from './footer-col.component';
import { FooterItemComponent } from './footer-item.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent, FooterColComponent, FooterItemComponent],
  exports: [FooterComponent],
  imports: [CommonModule, VtsIconModule, VtsPopoverModule, ColorSketchModule]
})
export class FooterModule {}
