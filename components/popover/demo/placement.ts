import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popover-placement',
  template: `
    <div style="margin-left: 60px">
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="topLeft"
      >
        TL
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="top"
      >
        Top
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="topRight"
      >
        TR
      </button>
    </div>
    <div style="width: 60px; float: left;">
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="leftTop"
      >
        LT
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="left"
      >
        Left
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="leftBottom"
      >
        LB
      </button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="rightTop"
      >
        RT
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="right"
      >
        Right
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="rightBottom"
      >
        RB
      </button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="bottomLeft"
      >
        BL
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="bottom"
      >
        Bottom
      </button>
      <button
        vts-button
        vts-popover
        vtsPopoverTitle="Title"
        [vtsPopoverContent]="contentTemplate"
        vtsPopoverPlacement="bottomRight"
      >
        BR
      </button>
    </div>
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
        width: 70px;
        text-align: center;
        padding: 0;
      }
    `
  ]
})
export class VtsDemoPopoverPlacementComponent {}
