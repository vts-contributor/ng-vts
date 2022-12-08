import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-arrow-point-at-center',
  template: `
    <button
      vts-button
      vtsPopoverTitle="Title"
      vtsPopoverContent="Content"
      vtsPopoverPlacement="topLeft"
      vts-popover
    >
      Align edge / 边缘对齐
    </button>
    <button
      vts-button
      vtsPopoverTitle="Title"
      vtsPopoverContent="Content"
      vtsPopoverPlacement="topCenter"
      vts-popover
    >
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
export class VtsDemoPopoverArrowPointAtCenterComponent {}
