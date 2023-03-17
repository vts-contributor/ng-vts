import { NgModule } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { VtsCarouselComponent } from './carousel.component';
import { VtsCarouselSlideDirective } from './carousel-slide.directive';
import { VtsCarouselPaginationComponent } from './carousel-pagination.component';
@NgModule({
  declarations: [VtsCarouselComponent, VtsCarouselSlideDirective, VtsCarouselPaginationComponent],
  exports: [VtsCarouselComponent, VtsCarouselSlideDirective, VtsCarouselPaginationComponent],
  imports: [BidiModule, CommonModule, PlatformModule]
})
export class VtsCarouselModule {}
