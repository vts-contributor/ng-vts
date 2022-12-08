import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-vertical',
  template: `
    <vts-space vtsDirection="vertical">
      <vts-card *vtsSpaceItem vtsTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </vts-card>
      <vts-card *vtsSpaceItem vtsTitle="Card" style="width: 300px">
        <p>Card content</p>
        <p>Card content</p>
      </vts-card>
    </vts-space>
  `
})
export class VtsDemoSpaceVerticalComponent {}
