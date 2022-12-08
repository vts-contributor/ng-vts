import { Component } from '@angular/core';
import { VtsMarks } from '@ui-vts/ng-vts/slider';

@Component({
  selector: 'vts-demo-grid-playground',
  template: `
    <div class="slider-container">
      <span>Horizontal Gutter (px):</span>
      <div class="slider">
        <vts-slider
          [vtsMarks]="marksHGutter"
          [vtsStep]="null"
          [vtsMin]="8"
          [vtsMax]="48"
          [(ngModel)]="hGutter"
        ></vts-slider>
      </div>
      <span>Vertical Gutter (px):</span>
      <div class="slider">
        <vts-slider
          [vtsMarks]="marksVGutter"
          [vtsStep]="null"
          [vtsMin]="8"
          [vtsMax]="48"
          [(ngModel)]="vGutter"
        ></vts-slider>
      </div>
      <span>Column Count:</span>
      <div class="slider">
        <vts-slider
          [vtsMarks]="marksCount"
          [vtsStep]="null"
          [vtsMin]="2"
          [vtsMax]="12"
          [(ngModel)]="count"
          (ngModelChange)="reGenerateArray($event)"
        ></vts-slider>
      </div>
    </div>

    <div class="gutter-example">
      <div vts-row [vtsGutter]="[hGutter, vGutter]">
        <div vts-col class="gutter-row" [vtsSpan]="24 / count" *ngFor="let i of array">
          <div class="grid-config">Column</div>
        </div>
        <div vts-col class="gutter-row" [vtsSpan]="24 / count" *ngFor="let i of array">
          <div class="grid-config">Column</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .slider {
        width: 50%;
      }
      .slider-container {
        margin-bottom: 16px;
      }
      .grid-config {
        height: 120px;
        font-size: 16px;
        line-height: 120px;
        background: #f56685;
        border-radius: 4px;
      }
    `
  ]
})
export class VtsDemoGridPlaygroundComponent {
  hGutter = 16;
  vGutter = 16;
  count = 4;
  array = new Array(this.count);
  marksHGutter: VtsMarks = {
    '8': '8',
    '16': '16',
    '24': '24',
    '32': '32',
    '40': '40',
    '48': '48'
  };
  marksVGutter: VtsMarks = {
    '8': '8',
    '16': '16',
    '24': '24',
    '32': '32',
    '40': '40',
    '48': '48'
  };
  marksCount: VtsMarks = {
    '2': '2',
    '3': '3',
    '4': '4',
    '6': '6',
    '8': '8',
    '12': '12'
  };
  reGenerateArray(count: number): void {
    this.array = new Array(count);
  }
}
