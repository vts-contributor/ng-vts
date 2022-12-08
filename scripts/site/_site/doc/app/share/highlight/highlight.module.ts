import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsHighlightComponent } from './highlight.component';

@NgModule({
  imports: [CommonModule],
  declarations: [VtsHighlightComponent],
  exports: [VtsHighlightComponent]
})
export class VtsHighlightModule {}
