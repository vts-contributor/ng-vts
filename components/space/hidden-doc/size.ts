import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-size',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio vtsValue="small">Small</label>
      <label vts-radio vtsValue="middle">Middle</label>
      <label vts-radio vtsValue="large">Large</label>
    </vts-radio-group>
    <vts-space [vtsSize]="size">
      <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
      <button *vtsSpaceItem vts-button vtsType="default">Default</button>
      <button *vtsSpaceItem vts-button vtsType="default">Dashed</button>
      <a *vtsSpaceItem vts-button vtsType="link">Link</a>
    </vts-space>
  `
})
export class VtsDemoSpaceSizeComponent {
  size: 'small' | 'middle' | 'large' | number = 'small';
}
