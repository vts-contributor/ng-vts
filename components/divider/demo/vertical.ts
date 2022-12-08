import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-divider-vertical',
  template: `
    <div>
      Text
      <vts-divider vtsType="vertical"></vts-divider>
      <a href="#">Link</a>
      <vts-divider vtsType="vertical"></vts-divider>
      <a href="#">Link</a>
    </div>
  `
})
export class VtsDemoDividerVerticalComponent {}
