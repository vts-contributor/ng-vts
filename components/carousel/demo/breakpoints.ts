import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-breakpoints',
  template: `
    <vts-carousel
      [vtsSlidesPerView]="vtsSlidesPerView"
      [vtsNavigation]="vtsNavigation"
      [vtsPagination]="vtsPagination"
      [vtsBreakpoints]="vtsBreakpoints"
      [vtsLoop]="vtsLoop"
    >
      <ng-template vts-carousel-slide *ngFor="let item of array">
        <img src="{{ item.src }}" alt="" />
      </ng-template>
    </vts-carousel>
  `,
  styles: [
    `
      vts-carousel {
        height: 200px;
        width: 100%;
      }
      img {
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class VtsDemoCarouselBreakpointsComponent {
  vtsSlidesPerView = 3;
  vtsNavigation = true;
  vtsPagination = { clickable: true };
  vtsLoop = true;
  vtsBreakpoints = {
    720: {
      vtsSlidesPerView: 2,
      vtsSpaceBetween: 30
    },
    1360: {
      vtsSlidesPerView: 3,
      vtsSpaceBetween: 20
    }
  };
  array = [
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ'
    },
    {
      src: 'https://i1-dulich.vnecdn.net/2023/02/06/Image-809267233-ExtractWord-2-4001-4429-1675670740.png?w=680&h=0&q=100&dpr=1&fit=crop&s=zz3jToDJI-F6KT1eZdRZxQ'
    }
  ];
}
