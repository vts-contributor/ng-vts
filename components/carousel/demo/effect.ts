import { Component, OnInit } from '@angular/core';
import { VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-effect',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Direction: &nbsp;
        <vts-radio-group [(ngModel)]="direction">
          <label vts-radio-button vtsValue="horizontal">Horizontal</label>
          <label vts-radio-button vtsValue="vertical">Vertical</label>
        </vts-radio-group>
      </span>
      <span *vtsSpaceItem>
        Transition speed: &nbsp;
        <vts-input-number
          style="width: 90px"
          [vtsMin]="500"
          [vtsStep]="500"
          [(ngModel)]="speed"
        ></vts-input-number>
      </span>
    </vts-space>
    <p>Slide</p>
    <vts-carousel
      [vtsSlidesPerView]="2"
      [vtsDirection]="direction"
      vtsEffect="slide"
      [vtsSpeed]="speed"
    >
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <p>Fade</p>
    <vts-carousel
      [vtsSlidesPerView]="2"
      [vtsDirection]="direction"
      vtsEffect="fade"
      [vtsSpeed]="speed"
    >
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <p>Flip</p>
    <vts-carousel
      [vtsSlidesPerView]="2"
      [vtsDirection]="direction"
      vtsEffect="flip"
      [vtsSpeed]="speed"
    >
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <p>Cube</p>
    <vts-carousel
      [vtsSlidesPerView]="2"
      [vtsDirection]="direction"
      vtsEffect="cube"
      [vtsSpeed]="speed"
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
export class VtsDemoCarouselEffectComponent implements OnInit {
  direction: VtsCarouselOptions['direction'] = 'horizontal';
  speed = 500;

  images = [
    {
      src: 'https://picsum.photos/1800/400?v=1'
    },
    {
      src: 'https://picsum.photos/1800/400?v=2'
    },
    {
      src: 'https://picsum.photos/1800/400?v=3'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
