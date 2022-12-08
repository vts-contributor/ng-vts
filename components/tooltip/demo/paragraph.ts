import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tooltip-paragraph',
  template: `
    <div style="margin-left:60px;">
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="topLeft"
        vts-button
        vts-tooltip
      >
        TL
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="top"
        vts-button
        vts-tooltip
      >
        Top
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="topRight"
        vts-button
        vts-tooltip
      >
        TR
      </button>
    </div>
    <div style="float:left;width: 60px;">
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="leftTop"
        vts-button
        vts-tooltip
      >
        LT
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="left"
        vts-button
        vts-tooltip
      >
        Left
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="leftBottom"
        vts-button
        vts-tooltip
      >
        LB
      </button>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="rightTop"
        vts-button
        vts-tooltip
      >
        RT
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="right"
        vts-button
        vts-tooltip
      >
        Right
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="rightBottom"
        vts-button
        vts-tooltip
      >
        RB
      </button>
    </div>
    <div style="margin-left:60px;clear: both;">
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="bottomLeft"
        vts-button
        vts-tooltip
      >
        BL
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
        vtsTooltipPlacement="bottom"
        vts-button
        vts-tooltip
      >
        Bottom
      </button>
      <button
        vtsTooltipType="paragraph"
        vtsTooltipTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
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
export class VtsDemoTooltipParagraphComponent {}
