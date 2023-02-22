import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-multiple',
  template: `
    <vts-carousel
     [vtsSlidesPerView]="vtsSlidesPerView"
     [vtsNavigation]="vtsNavigation"
     [vtsPagination]="vtsPagination"
     [vtsSpaceBetween]="vtsSpaceBetween"
     [vtsAutoplay]="vtsAutoplay"
    >
    <ng-template vts-carousel-slide *ngFor="let item of array">
      <img src={{item.src}} alt="">
    </ng-template>
    </vts-carousel>
    <div class="navigation-btn next-btn"></div>
    <div class="navigation-btn prev-btn"></div>
    <div class="pagination-custom"></div>
  `,
  styles: [
    `
      vts-carousel {
        height: 200px;
      }
      img {
        height: 100%;
        width: 100%;
      }
      .pagination-custom {
        text-align: center;
      }
      .navigation-btn {
        position: absolute;    
        top: 150px;
        width: calc(var(--carousel-navigation-size) / 44 * 27);
        height: var(--carousel-navigation-size);
        margin-top: calc(0px - (var(--carousel-navigation-size) / 2));
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #73777A;
        color: #fff;
        border-radius: 50%;
        width: 38px;
        height: 38px;
      }
      .next-btn {
        right: 0;
      }
      .next-btn:after {
        font-family: carousel-icons;
        font-size: 20px;
        content: 'next';
      }
      .prev-btn {
        left: 0;
      }
      .prev-btn:after {
        font-family: carousel-icons;
        font-size: 20px;
        content: 'prev';
      }
    `
  ]
})
export class VtsDemoCarouselMultipleComponent {
    vtsSlidesPerView = 3;
    vtsSpaceBetween = 20;
    vtsNavigation= {nextEl: '.next-btn', prevEl: '.prev-btn'};
    vtsPagination= {clickable: true, el: '.pagination-custom'};
    vtsAutoplay = true;
    array= [
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
      {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
    ];
}
