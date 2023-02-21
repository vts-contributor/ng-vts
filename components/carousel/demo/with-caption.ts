import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-with-caption',
  template: `
    <vts-carousel
     [slidesPerView]="slidesPerView"
     [navigation]="navigation"
     [pagination]="pagination"
    >
      <ng-template swiperSlide *ngFor="let item of array">
        <div class="item">
          <div class="caption">{{item.caption}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </ng-template>
    </vts-carousel>
  `,
  styles: [
    `
      vts-carousel {
        height: 200px;
      }

      .item {
        height: 100%;
        background-color: #7ad2d1;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .caption {
        font-size: 20px;
        font-weight: 700;
      }
      .content {
        font-size: 16px;
        font-weight: 400;
      }
    `
  ]
})
export class VtsDemoCarouselWithCaptionComponent {
    slidesPerView = 1;
    navigation= true;
    pagination= true;
    array= [
      {caption: 'Second slide label', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
      {caption: 'Second slide label', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
      {caption: 'Second slide label', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    ]
}
