import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-carousel-position',
  template: `
    <vts-radio-group [(ngModel)]="dotPosition">
      <label vts-radio-button vtsValue="bottom">Bottom</label>
      <label vts-radio-button vtsValue="top">Top</label>
      <label vts-radio-button vtsValue="left">Left</label>
      <label vts-radio-button vtsValue="right">Right</label>
    </vts-radio-group>
    <vts-carousel [vtsDotPosition]="dotPosition" [vtsDots]="enableDot">
      <div vts-carousel-content *ngFor="let index of array">
        <h3>{{ index }}</h3>
      </div>
    </vts-carousel>
  `,
  styles: [
    `
      vts-radio-group {
        margin-bottom: 8px;
      }

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
export class VtsDemoCarouselPositionComponent {
  array = [1, 2, 3, 4];
  dotPosition = 'bottom';
  enableDot = true;
}
