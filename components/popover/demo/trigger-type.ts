import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-trigger-type',
  template: `
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
    <button
      vts-button
      vts-popover
      vtsPopoverTitle="Title"
      [vtsPopoverContent]="contentTemplate"
      vtsPopoverTrigger="click"
    >
      Click me
    </button>
    <button
      vts-button
      vts-popover
      vtsPopoverTitle="Title"
      [vtsPopoverContent]="contentTemplate"
      vtsPopoverTrigger="hover"
    >
      Hover me
    </button>
    <button
      vts-button
      vts-popover
      vtsPopoverTitle="Title"
      [vtsPopoverContent]="contentTemplate"
      vtsPopoverTrigger="focus"
    >
      Focus me
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoPopoverTriggerTypeComponent {}
