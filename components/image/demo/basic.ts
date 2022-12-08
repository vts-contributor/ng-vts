import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-basic',
  template: `
    <img
      vts-image
      width="200px"
      height="200px"
      vtsSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      alt=""
    />
  `
})
export class VtsDemoImageBasicComponent {}
