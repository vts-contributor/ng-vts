import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VtsCarouselAutoplayOptions, VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-autoplay',
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
    <form [formGroup]="formGroup">
      <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
        <span *vtsSpaceItem>
          Enable: &nbsp;
          <vts-switch formControlName="enabled"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Delay: &nbsp;
          <vts-input-number
            [vtsMin]="1000"
            [vtsStep]="1000"
            formControlName="delay"
          ></vts-input-number>
        </span>
        <span *vtsSpaceItem>
          Stop at last slide: &nbsp;
          <vts-switch formControlName="stopOnLastSlide"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Stop on interction: &nbsp;
          <vts-switch formControlName="disableOnInteraction"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Pause on mouse enter: &nbsp;
          <vts-switch formControlName="pauseOnMouseEnter"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Reversed: &nbsp;
          <vts-switch formControlName="reverseDirection"></vts-switch>
        </span>
      </vts-space>
    </form>
    <p></p>
    <br />
    <vts-carousel
      [vtsDirection]="direction"
      [vtsSlidesPerView]="3"
      [vtsSpaceBetween]="8"
      [vtsAutoplay]="autoplayOptions"
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
export class VtsDemoCarouselAutoplayComponent implements OnInit {
  direction: VtsCarouselOptions['direction'] = 'horizontal';

  images = [
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
    },
    {
      src: 'https://picsum.photos/1800/400?v=8'
    },
    {
      src: 'https://picsum.photos/1800/400?v=9'
    },
    {
      src: 'https://picsum.photos/1800/400?v=10'
    }
  ];

  formGroup = new FormGroup({
    enabled: new FormControl(true, { nonNullable: true }),
    delay: new FormControl(1000, { nonNullable: true }),
    stopOnLastSlide: new FormControl(false, { nonNullable: true }),
    disableOnInteraction: new FormControl(false, { nonNullable: true }),
    pauseOnMouseEnter: new FormControl(false, { nonNullable: true }),
    reverseDirection: new FormControl(false, { nonNullable: true })
  });

  autoplayOptions: VtsCarouselAutoplayOptions = this.formGroup.value;

  constructor() {
    this.formGroup.valueChanges.subscribe(d => {
      this.autoplayOptions = { ...d };
    });
  }

  ngOnInit(): void {}
}
