import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-basic',
  template: `
    <vts-carousel [vtsEffect]="effect">
      <div vts-carousel-content *ngFor="let index of array">
        <h3>{{ index }}</h3>
      </div>
    </vts-carousel>
  `,
  styles: [
    `
      [vts-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
        margin-bottom: 0;
      }
    `
  ]
})
export class VtsDemoCarouselBasicComponent {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
}
