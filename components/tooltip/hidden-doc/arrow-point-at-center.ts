import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tooltip-arrow-point-at-center',
  template: `
    <button vts-button vtsTooltipTitle="prompt text" vtsTooltipPlacement="topLeft" vts-tooltip>
      Align edge / 边缘对齐
    </button>
    <button vts-button vtsTooltipTitle="prompt text" vtsTooltipPlacement="topCenter" vts-tooltip>
      Arrow points to center / 箭头指向中心
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoTooltipArrowPointAtCenterComponent {}
