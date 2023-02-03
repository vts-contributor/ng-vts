import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-type',
  template: `
    <p>Square</p>
    <img
      vts-image
      width="400px"
      height="200px"
      vtsSrc="https://picsum.photos/400/200?v=1"
      vtsShape="square"
      alt=""
    />
    <p>Rounded</p>
    <img
      vts-image
      width="400px"
      height="200px"
      vtsSrc="https://picsum.photos/400/200?v=2"
      vtsShape="rounded"
      alt=""
    />
    <p>Circle</p>
    <img
      vts-image
      width="200px"
      height="200px"
      vtsSrc="https://picsum.photos/200/200?v=3"
      vtsShape="circle"
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
export class VtsDemoImageTypeComponent {}
