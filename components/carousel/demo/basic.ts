import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-basic',
  template: `
    <vts-carousel
     [slidesPerView]="slidesPerView"
     [spaceBetween]="spaceBetween"
     [navigation]="navigation"
    >
      <ng-template swiperSlide>Slide 1</ng-template>
      <ng-template swiperSlide>Slide 2</ng-template>
      <ng-template swiperSlide>Slide 3</ng-template>
      <ng-template swiperSlide>Slide 4</ng-template>
      <ng-template swiperSlide>Slide 5</ng-template>
      <ng-template swiperSlide>Slide 6</ng-template>
    </vts-carousel>
  `
})
export class VtsDemoCarouselBasicComponent {
    slidesPerView = 3
    spaceBetween = 50;
    navigation= true;
}
