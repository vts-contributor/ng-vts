import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-rate-character',
  template: `
    <vts-rate [ngModel]="0" vtsAllowHalf [vtsCharacter]="characterIcon"></vts-rate>
    <br />
    <vts-rate
      [ngModel]="0"
      vtsAllowHalf
      class="large"
      [vtsCharacter]="characterEnLetter"
    ></vts-rate>
    <br />
    <vts-rate [ngModel]="0" vtsAllowHalf [vtsCharacter]="characterZhLetter"></vts-rate>
    <ng-template #characterIcon><i vts-icon vtsType="heart"></i></ng-template>
    <ng-template #characterZhLetter>好</ng-template>
    <ng-template #characterEnLetter>A</ng-template>
  `,
  styles: [
    `
      .large ::ng-deep .vts-rate-star {
        font-size: 36px;
      }
    `
  ]
})
export class VtsDemoRateCharacterComponent {}
