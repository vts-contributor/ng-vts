import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-block',
  template: `
    <button vts-button vtsType="primary" vtsBlock>Primary</button>
    <button vts-button vtsType="default" vtsBlock>Default</button>
    <button vts-button vtsType="default" vtsBlock>Dashed</button>
    <button vts-button vtsType="text" vtsBlock>Text</button>
    <a vts-button vtsType="link" vtsBlock>Link</a>
  `,
  styles: [
    `
      [vts-button] {
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoButtonBlockComponent {}
