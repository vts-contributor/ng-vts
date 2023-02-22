import { NgModule } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { VtscarouselComponent } from './carousel.component';
import { carouselSlideDirective } from './carousel-slide.directive';
@NgModule({
  declarations: [VtscarouselComponent, carouselSlideDirective],
  exports: [VtscarouselComponent, carouselSlideDirective],
  imports: [BidiModule, CommonModule, PlatformModule],
})
export class VtscarouselModule {}
