import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-with-indicators',
  template: `
    <vts-carousel
     [vtsSlidesPerView]="vtsSlidesPerView"
     [navigation]="navigation"
     [pagination]="pagination"
    >
      <ng-template vts-carousel-slide *ngFor="let item of array">
        <img src={{item.src}} alt="">
      </ng-template>
    </vts-carousel>
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
    `
  ]
})
export class VtsDemoCarouselWithIndicatorsComponent {
  vtsSlidesPerView = 1;
  navigation= true;
  pagination= {clickable: true};
  array= [
    {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
    {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
    {src: "https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ"},
  ];
}
