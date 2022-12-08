import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-back-top-basic',
  template: `
    <vts-back-top></vts-back-top>
    Scroll down to see the bottom-right
    <strong>gray</strong>
    button.
  `,
  styles: [
    `
      strong {
        color: rgba(64, 64, 64, 0.6);
      }
    `
  ]
})
export class VtsDemoBackTopBasicComponent {}
