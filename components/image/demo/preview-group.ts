import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-preview-group',
  template: `
    <vts-image-group>
      <img
        vts-image
        width="200px"
        vtsSrc="https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg"
        alt=""
      />
      <img
        vts-image
        width="200px"
        vtsSrc="https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg"
        alt=""
      />
    </vts-image-group>
  `
})
export class VtsDemoImagePreviewGroupComponent {}
