import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VtsCarouselAutoplayOptions, VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-autoplay',
  template: `
    <p>Basic:</p>
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
          Delay: &nbsp;
          <vts-input-number [vtsMin]="1000" [vtsStep]="1000" formControlName="delay"></vts-input-number>
        </span>
      </vts-space>
    </form>
    <p></p>
    <br />
    <vts-carousel 
      [vtsDirection]="direction" 
      [vtsSlidesPerView]="3"
      [vtsSpaceBetween]="8"
      [vtsAutoplay]="true"
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
  direction: VtsCarouselOptions['direction'] = 'horizontal'

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
    delay: new FormControl(1000, {nonNullable: true}),
  });
  autoplayOptions: VtsCarouselAutoplayOptions = this.formGroup.value
  
  constructor() {
  }

  ngOnInit(): void { }
}
