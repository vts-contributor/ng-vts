import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsCarouselComponent } from './carousel.component';
import { SwiperSlideDirective } from './carousel-slide.directive';
@NgModule({
  declarations: [VtsCarouselComponent, SwiperSlideDirective],
  exports: [VtsCarouselComponent, SwiperSlideDirective],
  imports: [CommonModule],
})
export class VtsCarouselModule {}
