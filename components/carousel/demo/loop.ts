import { Component, OnInit } from '@angular/core';
import { VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-loop',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Direction: &nbsp;
        <vts-radio-group [(ngModel)]="direction">
          <label vts-radio-button vtsValue="horizontal">Horizontal</label>
          <label vts-radio-button vtsValue="vertical">Vertical</label>
        </vts-radio-group>
      </span>
    </vts-space>
    <p></p>
    <br />
    <vts-carousel
      [vtsDirection]="direction"
      [vtsSlidesPerView]="3"
      [vtsSpaceBetween]="8"
      [vtsLoop]="true"
    >
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
export class VtsDemoCarouselLoopComponent implements OnInit {
  direction: VtsCarouselOptions['direction'] = 'horizontal';

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
