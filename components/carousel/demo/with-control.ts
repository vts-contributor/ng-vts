import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-with-control',
  template: `
    <vts-carousel
     [slidesPerView]="slidesPerView"
     [navigation]="navigation"
    >
      <ng-template swiperSlide> <div class="item">Slide 1</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 2</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 3</div> </ng-template>
    </vts-carousel>
  `,
  styles: [
    `
      vts-carousel {
        height: 200px;
      }

      .item {
        background-color: #7ad2d1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  ]
})
export class VtsDemoCarouselWithControlComponent {
    slidesPerView = 1;
    navigation= true;
}
