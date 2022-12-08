import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-link',
  template: `
    <a href="javascript:void(0)" vts-button vtsType="link">Read more</a>
    <a href="javascript:void(0)" vts-button vtsType="link" disabled>Read more</a>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }

      vts-button-group [vts-button] {
        margin-right: 0;
      }
    `
  ]
})
export class VtsDemoButtonLinkComponent {}
