import { Component, OnInit } from '@angular/core';
import { VtsCarouselBreakpointOptions, VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-breakpoint',
  template: `
    <vts-carousel [vtsBreakpoints]="breakpoints" [vtsLoop]="true">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
  `,
  styles: [
    `
      .vts-carousel {
        height: 400px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    `
  ]
})
export class VtsDemoCarouselBreakpointComponent implements OnInit {
  direction: VtsCarouselOptions['direction'] = 'horizontal';

  breakpoints: VtsCarouselBreakpointOptions = {
    0: {
      direction: 'horizontal',
      slidesPerView: 1
    },
    576: {
      direction: 'vertical',
      slidesPerView: 2
    },
    920: {
      slidesPerView: 2,
      spaceBetween: 4,
      direction: 'horizontal'
    },
    1360: {
      slidesPerView: 3,
      spaceBetween: 16
    }
  };

  images = [
    {
      src: 'https://picsum.photos/1800/400?v=1'
    },
    {
      src: 'https://picsum.photos/1800/400?v=2'
    },
    {
      src: 'https://picsum.photos/1800/400?v=3'
    },
    {
      src: 'https://picsum.photos/1800/400?v=4'
    },
    {
      src: 'https://picsum.photos/1800/400?v=5'
    },
    {
      src: 'https://picsum.photos/1800/400?v=6'
    },
    {
      src: 'https://picsum.photos/1800/400?v=7'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
