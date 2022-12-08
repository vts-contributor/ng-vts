import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-basic',
  template: `
    <button vts-button vtsType="primary">Primary Button</button>
    <button vts-button vtsType="default">Default Button</button>
    <button vts-button vtsType="default">Dashed Button</button>
    <button vts-button vtsType="text">Text Button</button>
    <a vts-button vtsType="link">Link Button</a>
    <button vts-button vtsType="text">
      <i vts-icon vtsType="Download"></i>
    </button>
    <a href="javascript:void(0)" vts-button vtsType="link">
      <i vts-icon vtsType="Download"></i>
    </a>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoButtonBasicComponent {}
