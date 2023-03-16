import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VtsCarouselOptions, VtsCarouselPaginationOptions } from '@ui-vts/ng-vts/carousel';

@Component({
  selector: 'vts-demo-carousel-pagination',
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
        <span *vtsSpaceItem>
          Clickable: &nbsp;
          <vts-switch formControlName="clickable"></vts-switch>
        </span>
        <span *vtsSpaceItem>
          Type: &nbsp;
          <vts-radio-group formControlName="type">
            <label vts-radio-button vtsValue="bullets">Bullets</label>
            <label vts-radio-button vtsValue="fraction">Fraction</label>
            <label vts-radio-button vtsValue="progressbar">Progress Bar</label>
          </vts-radio-group>
        </span>
      </vts-space>
    </form>
    <br />
    <vts-carousel [vtsSlidesPerView]="1" [vtsPagination]="pageOptions" [vtsDirection]="direction">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <br />
    <p>Custom Render:</p>
    <vts-carousel [vtsSlidesPerView]="1" [vtsPagination]="customRenderPageOptions">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <br />
    <p>Dynamic Bullets:</p>
    <vts-carousel [vtsSlidesPerView]="1" [vtsPagination]="dynamicBulletPageOptions">
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
    </vts-carousel>
    <br />
    <br />
    <p>Custom Element:</p>
    <vts-carousel
      [vtsSlidesPerView]="1"
      [vtsPagination]="customElementPageOptions"
      (vtsActiveIndexChange)="onActiveIndexChange($event)"
      (vtsSlidesLengthChange)="onSlideLengthChange($event)"
    >
      <ng-container *ngFor="let item of images">
        <img *vtsCarouselSlide src="{{ item.src }}" alt="" />
      </ng-container>
      <vts-carousel-pagination class="custom-pagination">
        {{ currentIndex + 1 }} / {{ currentLength }}
      </vts-carousel-pagination>
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

      .custom-container {
        position: relative;
      }

      ::ng-deep .custom-carousel-pagination-bullet {
        height: 24px;
        width: 24px;
        background: #ee0033;
        color: white;
      }

      .custom-pagination {
        position: absolute;
        top: 0;
        left: 0;
        background: #ee0033;
        z-index: 100;
        padding: 4px 8px;
        color: white;
      }
    `
  ]
})
export class VtsDemoCarouselPaginationComponent implements OnInit {
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

  currentIndex = 0;
  currentLength = 0;
  onActiveIndexChange(idx: number) {
    this.currentIndex = idx;
    // Custom element may not be updated itself
    // Call detectChanges() to ensure view updated
    this.cdr.detectChanges();
  }
  onSlideLengthChange(length: number) {
    this.currentLength = length;
    // Custom element may not be updated itself
    // Call detectChanges() to ensure view updated
    this.cdr.detectChanges();
  }

  formGroup = new FormGroup({
    enabled: new FormControl(true, { nonNullable: true }),
    hideOnClick: new FormControl(false, { nonNullable: true }),
    clickable: new FormControl(false, { nonNullable: true }),
    type: new FormControl<VtsCarouselPaginationOptions['type']>('bullets', { nonNullable: true })
  });

  pageOptions: VtsCarouselPaginationOptions = this.formGroup.value;
  customRenderPageOptions: VtsCarouselPaginationOptions = {
    enabled: true,
    type: 'bullets',
    clickable: true,
    renderBullet: (index, className) =>
      `<span class="${className} custom-carousel-pagination-bullet">${index}</span>`
  };
  dynamicBulletPageOptions: VtsCarouselPaginationOptions = {
    enabled: true,
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 2
  };

  customElementPageOptions: VtsCarouselPaginationOptions | boolean = true;

  constructor(private cdr: ChangeDetectorRef) {
    this.formGroup.valueChanges.subscribe(d => {
      this.pageOptions = { ...d, dynamicBullets: false };
    });
  }

  ngOnInit(): void {}
}
