import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-basic',
  template: `
    <button
      vts-button
      vts-popover
      vtsType="primary"
      vtsPopoverTitle="Title"
      vtsPopoverContent="Content"
    >
      Hover me
    </button>
  `
})
export class VtsDemoPopoverBasicComponent {}
