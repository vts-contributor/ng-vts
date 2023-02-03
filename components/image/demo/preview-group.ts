import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-preview-group',
  template: `
    <vts-image-group>
      <img
        vts-image
        width="200px"
        height="100px"
        vtsSrc="https://picsum.photos/1000/500?v=7"
        alt=""
        vtsPreview
      />
      &nbsp;
      <img
        vts-image
        width="200px"
        height="100px"
        vtsSrc="https://picsum.photos/1000/500?v=8"
        alt=""
        vtsPreview
      />
    </vts-image-group>
  `,
  styles: [
    `
      .vts-image {
        cursor: pointer;
      }
    `
  ]
})
export class VtsDemoImagePreviewGroupComponent {}
