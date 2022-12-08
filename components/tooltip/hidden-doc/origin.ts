import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tooltip-origin',
  template: `
    <button vts-button vts-element #button="vtsElement">Action</button>
    <a
      vts-tooltip
      vtsTooltipTitle="This action could not be revoked!"
      [vtsTooltipOrigin]="button.elementRef"
    >
      Notice
    </a>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoTooltipOriginComponent {}
