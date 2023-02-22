import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-multiple-with-caption',
  template: `
    <vts-carousel
     [vtsSlidesPerView]="vtsSlidesPerView"
     [navigation]="navigation"
     [pagination]="pagination"
     [vtsSpaceBetween]="vtsSpaceBetween"
    >
      <ng-template vts-carousel-slide *ngFor="let item of array">
        <img src='{{item.src}}' alt="" />
        <div class="content">{{item.content}}</div>
      </ng-template>
    </vts-carousel>
    <div class="navigation-btn next-btn"></div>
    <div class="navigation-btn prev-btn"></div>
    <div class="pagination-multiple-custom"></div>
  `,
  styles: [
    `
      vts-carousel {
        height: 300px;
      }
      img {
        height: 200px;
        width: 100%;
      }
      .content {
        font-size: 16px;
        font-weight: 400;
        bottom: 40px;
        color: #000;
        width: 100%;
        text-align: center;
      }
      .pagination-multiple-custom {
        text-align: center;
      }
      .navigation-btn {
        position: absolute;    
        top: 37%;
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
export class VtsDemoCarouselMultipleWithCaptionComponent {
  vtsSlidesPerView = 3;
  navigation= {nextEl: '.next-btn', prevEl: '.prev-btn'};
  vtsSpaceBetween = 20;
  pagination= {clickable: true, el: '.pagination-multiple-custom'};
  array= [
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      content: 'They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      content: 'They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'
    },{
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      content: 'They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ',
      content: 'They all have something to say beyond the words on the page. They can come across as casual or neutral, exotic or graphic. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'
    }
  ]
}
