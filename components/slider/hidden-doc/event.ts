import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-slider-event',
  template: `
    <vts-slider
      [(ngModel)]="singleValue"
      (ngModelChange)="onChange($event)"
      (vtsOnAfterChange)="onAfterChange($event)"
    ></vts-slider>
    <vts-slider
      vtsRange
      [vtsStep]="10"
      [(ngModel)]="rangeValue"
      (ngModelChange)="onChange($event)"
      (vtsOnAfterChange)="onAfterChange($event)"
    ></vts-slider>
  `
})
export class VtsDemoSliderEventComponent {
  singleValue = 30;
  rangeValue = [20, 50];

  onChange(value: number): void {
    console.log(`onChange: ${value}`);
  }

  onAfterChange(value: number[] | number): void {
    console.log(`onAfterChange: ${value}`);
  }
}
