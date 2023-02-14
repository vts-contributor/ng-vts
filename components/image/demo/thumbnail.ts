import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-thumbnail',
  template: `
    <p>Square</p>
    <img
      vts-image
      width="400px"
      height="200px"
      vtsSrc="https://picsum.photos/400/200?v=5"
      vtsShape="square"
      vtsThumbnail
      alt=""
    />
    <p>Rounded</p>
    <img
      vts-image
      width="400px"
      height="200px"
      vtsSrc="https://picsum.photos/400/200?v=6"
      vtsShape="rounded"
      vtsThumbnail
      alt=""
    />
    <p>Circle</p>
    <img
      vts-image
      width="200px"
      height="200px"
      vtsSrc="https://picsum.photos/200/200?v=7"
      vtsShape="circle"
      vtsThumbnail
      alt=""
    />
  `,
  styles: [
    `
      p {
        margin-top: 16px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoImageThumbnailComponent {}
