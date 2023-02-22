import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-with-caption',
  template: `
    <vts-carousel
     [vtsSlidesPerView]="vtsSlidesPerView"
     [vtsNavigation]="vtsNavigation"
     [vtsPagination]="vtsPagination"
    >
      <ng-template vts-carousel-slide *ngFor="let item of array">
        <img src='{{item.src}}' alt="" />
        <div class="caption">{{item.caption}}</div>
        <div class="content">{{item.content}}</div>
      </ng-template>
    </vts-carousel>
  `,
  styles: [
    `
      vts-carousel {
        height: 260px;
        width: 33.33%;
      }
      img {
        height: 100%;
        width: 100%;
      }
      .caption {
        font-size: 20px;
        font-weight: 700;
        position: absolute;
        bottom: 60px;
        color: #fff;
        width: 100%;
        text-align: center;
      }
      .content {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        bottom: 40px;
        color: #fff;
        width: 100%;
        text-align: center;
      }
      .pagination-custom {
        text-align: center;
      }
    `
  ]
})
export class VtsDemoCarouselWithCaptionComponent {
  vtsSlidesPerView = 1;
  vtsNavigation= true;
  vtsPagination= {clickable: true, el: '.pagination-custom'};
  array= [
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      caption: 'Second slide label', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      caption: 'Second slide label', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      caption: 'Second slide label', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ]
}
