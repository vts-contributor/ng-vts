import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';
import { VtsHighlightModule } from '../highlight/highlight.module';
import { VtsCodeBoxComponent } from './codebox.component';

@NgModule({
  imports: [CommonModule, VtsHighlightModule, VtsIconModule, VtsToolTipModule],
  declarations: [VtsCodeBoxComponent],
  exports: [VtsCodeBoxComponent]
})
export class VtsCodeBoxModule {}
