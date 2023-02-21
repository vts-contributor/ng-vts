import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-multiple',
  template: `
    <vts-carousel
     [slidesPerView]="slidesPerView"
     [navigation]="navigation"
     [pagination]="pagination"
     [spaceBetween]="spaceBetween"
     [vtsDotPosition]="vtsDotPosition"
    >
      <ng-template swiperSlide> <div class="item">Slide 1</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 2</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 3</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 4</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 5</div> </ng-template>
      <ng-template swiperSlide> <div class="item">Slide 6</div> </ng-template>
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
export class VtsDemoCarouselMultipleComponent {
    slidesPerView = 3;
    spaceBetween = 20;
    navigation= true;
    pagination= true;
    vtsDotPosition = "outside";
}
