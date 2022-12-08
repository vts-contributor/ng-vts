import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-icon-slider',
  template: `
    <div class="icon-wrapper test-class">
      <i vts-icon vtsType="frown" [class.icon-highlight]="preHighLight"></i>
      <vts-slider [vtsMin]="0" [vtsMax]="20" [(ngModel)]="sliderValue"></vts-slider>
      <i vts-icon vtsType="Face" [class.icon-highlight]="nextHighLight"></i>
    </div>
  `,
  styles: [
    `
      .icon-wrapper {
        position: relative;
        padding: 0px 30px;
      }

      [vts-icon] {
        position: absolute;
        top: -2px;
        width: 16px;
        height: 16px;
        line-height: 1;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.25);
      }

      [vts-icon]:first-child {
        left: 0;
      }

      [vts-icon]:last-child {
        right: 0;
      }

      .icon-highlight {
        color: rgba(0, 0, 0, 0.45);
      }
    `
  ]
})
export class VtsDemoSliderIconSliderComponent implements OnInit {
  min = 0;
  max = 20;
  mid = parseFloat(((this.max - this.min) / 2).toFixed(5));
  preHighLight = false;
  nextHighLight = false;
  _sliderValue = 0;

  set sliderValue(value: number) {
    this._sliderValue = value;
    this.highlightIcon();
  }

  get sliderValue(): number {
    return this._sliderValue;
  }

  ngOnInit(): void {
    this.sliderValue = 0;
  }

  highlightIcon(): void {
    const lower = this._sliderValue >= this.mid;
    this.preHighLight = !lower;
    this.nextHighLight = lower;
  }
}
