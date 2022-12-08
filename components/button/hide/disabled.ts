import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-disabled',
  template: `
    <button vts-button vtsType="primary">Primary</button>
    <button vts-button vtsType="primary" disabled>Primary(disabled)</button>
    <br />
    <button vts-button vtsType="default">Default</button>
    <button vts-button vtsType="default" disabled>Default(disabled)</button>
    <br />
    <button vts-button vtsType="default">Dashed</button>
    <button vts-button vtsType="default" disabled>Dashed(disabled)</button>
    <br />
    <a vts-button vtsType="text">Text</a>
    <a vts-button vtsType="text" disabled>Text(disabled)</a>
    <br />
    <a vts-button vtsType="link">Link</a>
    <a vts-button vtsType="link" disabled>Link(disabled)</a>
    <br />
    <button vts-button vtsType="text">
      <i vts-icon vtsType="Download"></i>
    </button>
    <button vts-button vtsType="text" disabled>
      <i vts-icon vtsType="Download"></i>
    </button>
    <br />
    <a href="javascript:void(0)" vts-button vtsType="link">
      <i vts-icon vtsType="Download"></i>
    </a>
    <a href="javascript:void(0)" vts-button vtsType="link" disabled>
      <i vts-icon vtsType="Download"></i>
    </a>
    <br />
    <div style="padding: 8px 8px 0px; background: rgb(190, 200, 200);">
      <button vts-button vtsGhost>Ghost</button>
      <button vts-button vtsGhost disabled>Ghost(disabled)</button>
    </div>
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
export class VtsDemoButtonDisabledComponent {}
