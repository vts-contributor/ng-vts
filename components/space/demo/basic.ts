import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-basic',
  template: `
    <vts-slider vtsMin="0" vtsMax="10" [(ngModel)]="size"></vts-slider>
    <vts-space vtsWrap [vtsPreset]="size">
      <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
      <button *vtsSpaceItem vts-button vtsType="default">Button</button>
    </vts-space>
  `,
  styles: [
    `
      vts-slider,
      vts-space {
        margin-top: 40px;
      }
    `
  ]
})
export class VtsDemoSpaceBasicComponent {
  size = 0;
}
