import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-customize',
  template: `
    <vts-slider [(ngModel)]="size"></vts-slider>
    <vts-space [vtsSize]="size">
      <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
      <button *vtsSpaceItem vts-button vtsType="default">Default</button>
      <button *vtsSpaceItem vts-button vtsType="default">Dashed</button>
      <a *vtsSpaceItem vts-button vtsType="link">Link</a>
    </vts-space>
  `
})
export class VtsDemoSpaceCustomizeComponent {
  size = 8;
}
