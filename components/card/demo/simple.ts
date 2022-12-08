import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-simple',
  template: `
    <vts-card style="width:300px;">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </vts-card>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class VtsDemoCardSimpleComponent {}
