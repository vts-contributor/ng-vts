import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tooltip-sentence',
  template: `
    <div style="margin-left:60px;">
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        [vtsTooltipPlacement]="['topLeft', 'leftTop']"
        vts-button
        vts-tooltip
      >
        TL
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="top"
        vts-button
        vts-tooltip
      >
        Top
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="topRight"
        vts-button
        vts-tooltip
      >
        TR
      </button>
    </div>
    <div style="float:left;width: 60px;">
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="leftTop"
        vts-button
        vts-tooltip
      >
        LT
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="left"
        vts-button
        vts-tooltip
      >
        Left
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="leftBottom"
        vts-button
        vts-tooltip
      >
        LB
      </button>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="rightTop"
        vts-button
        vts-tooltip
      >
        RT
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="right"
        vts-button
        vts-tooltip
      >
        Right
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="rightBottom"
        vts-button
        vts-tooltip
      >
        RB
      </button>
    </div>
    <div style="margin-left:60px;clear: both;">
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="bottomLeft"
        vts-button
        vts-tooltip
      >
        BL
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="bottom"
        vts-button
        vts-tooltip
      >
        Bottom
      </button>
      <button
        vtsTooltipTitle="Tooltip message will show up here"
        vtsTooltipPlacement="bottomRight"
        vts-button
        vts-tooltip
      >
        BR
      </button>
    </div>
  `,
  styles: [
    `
      button {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoTooltipSentenceComponent {}
