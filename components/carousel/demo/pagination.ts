import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { VtsCarouselNavigationOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-pagination',
  template: `
    <p>Basic:</p>
    <form [formGroup]="formGroup">
      <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
        <span *vtsSpaceItem>
          Active: &nbsp;
          <vts-switch formControlName="enabled"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Hide on click: &nbsp;
          <vts-switch formControlName="hideOnClick"></vts-switch>
        </span>
      </vts-space>
    </form>
    <br />
    <vts-carousel [vtsSlidesPerView]="1" [vtsNavigation]="navOptions">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <br />
    <p>Custom:</p>
    <div class='custom-container'>
      <vts-carousel [vtsSlidesPerView]="1" [vtsNavigation]="customNavOptions">
        <ng-container *ngFor="let item of images">
          <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
        </ng-container>
      </vts-carousel>
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
        margin: 0 24px;
      }

      .custom-prev-btn, .custom-next-btn {
        position: absolute;
        background: #73777A;
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
export class VtsDemoCarouselPaginationComponent implements OnInit {
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
  ];

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    enabled: new UntypedFormControl(true, {}),
    hideOnClick: new UntypedFormControl(false, {}),
  });

  navOptions: VtsCarouselNavigationOptions = this.formGroup.value
    
  @ViewChild('nextBtn', {static: true}) nextEl!: ElementRef
  customNavOptions: VtsCarouselNavigationOptions | boolean = false 

  constructor() {
    this.formGroup.valueChanges.subscribe((d) => {
      this.navOptions = {...d}
    })
  }

  ngOnInit(): void {
    this.customNavOptions = {
      enabled: true,
      prevEl: '.custom-prev-btn', // Selector or HTMLElement
      nextEl: this.nextEl.nativeElement // Selector or HTMLElement
    }
  }
}
