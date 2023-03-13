import { NgModule } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { VtsCarouselComponent } from './carousel.component';
import { VtsCarouselSlideDirective } from './carousel-slide.directive';
@NgModule({
  declarations: [VtsCarouselComponent, VtsCarouselSlideDirective],
  exports: [VtsCarouselComponent, VtsCarouselSlideDirective],
  imports: [BidiModule, CommonModule, PlatformModule]
})
export class VtsCarouselModule {}
