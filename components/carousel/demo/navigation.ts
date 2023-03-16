import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { VtsCarouselNavigationOptions, VtsCarouselOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-navigation',
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
          Enable: &nbsp;
          <vts-switch formControlName="enabled"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Hide on click: &nbsp;
          <vts-switch formControlName="hideOnClick"></vts-switch>
        </span>
      </vts-space>
    </form>
    <br />
    <vts-carousel [vtsSlidesPerView]="1" [vtsNavigation]="navOptions" [vtsDirection]="direction">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <br />
    <p>Custom:</p>
    <div class="custom-container">
      <vts-carousel [vtsSlidesPerView]="1" [vtsNavigation]="customNavOptions">
        <ng-container *ngFor="let item of images">
          <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
        </ng-container>
      </vts-carousel>
      <div class="custom-prev-btn">
        <svg
          width="8"
          height="15"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.93 1.485a1.875 1.875 0 0 0-2.655 0L.81 13.95a1.494 1.494 0 0 0 0 2.115L13.275 28.53c.735.735 1.92.735 2.655 0a1.874 1.874 0 0 0 0-2.655L5.07 15 15.945 4.125c.72-.72.72-1.92-.015-2.64Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div #nextBtn class="custom-next-btn">
        <svg
          width="8"
          height="15"
          viewBox="0 0 17 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.07 28.515c.735.735 1.92.735 2.655 0L16.19 16.05a1.495 1.495 0 0 0 0-2.115L3.725 1.47a1.874 1.874 0 0 0-2.655 0 1.874 1.874 0 0 0 0 2.655L11.93 15 1.055 25.875c-.72.72-.72 1.92.015 2.64Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
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

      .custom-container {
        position: relative;
      }

      .custom-prev-btn,
      .custom-next-btn {
        position: absolute;
        background: #73777a;
        top: 50%;
        height: 48px;
        width: 48px;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: white;
        cursor: pointer;
      }

      .custom-prev-btn {
        left: 0;
        transform: translateX(-50%);
      }

      .custom-next-btn {
        right: 0;
        transform: translateX(50%);
      }
    `
  ]
})
export class VtsDemoCarouselNavigationComponent implements OnInit {
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
    }
  ];

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    enabled: new UntypedFormControl(true, {}),
    hideOnClick: new UntypedFormControl(false, {})
  });

  navOptions: VtsCarouselNavigationOptions = this.formGroup.value;

  @ViewChild('nextBtn', { static: true }) nextEl!: ElementRef;
  customNavOptions: VtsCarouselNavigationOptions | boolean = false;

  constructor() {
    this.formGroup.valueChanges.subscribe(d => {
      this.navOptions = { ...d };
    });
  }

  ngOnInit(): void {
    this.customNavOptions = {
      enabled: true,
      prevEl: '.custom-prev-btn', // Selector or HTMLElement
      nextEl: this.nextEl.nativeElement // Selector or HTMLElement
    };
  }
}
