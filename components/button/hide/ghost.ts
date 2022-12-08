import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-ghost',
  template: `
    <div style="background: rgb(190, 200, 200);padding: 26px 16px 16px;">
      <button vts-button vtsType="primary" vtsGhost>Primary</button>
      <button vts-button vtsType="default" vtsGhost>Default</button>
      <button vts-button vtsType="default" vtsGhost>Dashed</button>
      <button vts-button vtsType="text" vtsGhost>Text</button>
      <a vts-button vtsType="link" vtsGhost>Link</a>
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
export class VtsDemoButtonGhostComponent {}
