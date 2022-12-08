import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-icon',
  template: `
    <button vts-button vtsType="text">
      <i vts-icon vtsType="DeleteForever"></i>
    </button>
    <button vts-button vtsType="text" disabled>
      <i vts-icon vtsType="DeleteForever"></i>
    </button>
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
export class VtsDemoButtonIconComponent {}
