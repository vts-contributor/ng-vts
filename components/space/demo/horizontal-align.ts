import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-horizontal-align',
  template: `
    <div class="space-align-container">
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Alignment - Center</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="center"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Alignment - End</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="end"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Alignment - Start</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="start"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Alignment - Stretch</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Justify - Around</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsJustify="around"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Justify - Between</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsJustify="between"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Justify - Center</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsJustify="center"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Justify - End</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsJustify="end"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
      <div class="space-align-block">
        <p class="vts-typo-body2">Horizontal - Justify - Start</p>
        <div
          vts-space
          vtsDirection="horizontal"
          vtsAlign="stretch"
          vtsJustify="start"
          vtsPreset="0"
          class="space-block-demo"
        >
          <span *vtsSpaceItem class="mock-block-1"></span>
          <span *vtsSpaceItem class="mock-block-2"></span>
          <span *vtsSpaceItem class="mock-block-3"></span>
          <span *vtsSpaceItem class="mock-block-4"></span>
          <span *vtsSpaceItem class="mock-block-5"></span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .space-align-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      .space-align-block {
        margin: 16px;
        flex: 0 0 300px;
      }
      .space-align-block p {
        margin-bottom: 8px;
      }
      .space-block-demo {
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        width: 100%;
        height: calc(100% - 16px);
      }
      .space-block-demo.vts-space-vertical {
        min-height: 300px;
      }
      [class^='mock-block'] {
        display: inline-block;
      }
      .mock-block-1 {
        background: #f56685;
        min-height: 82px;
        min-width: 82px;
        height: 100%;
        width: 100%;
      }
      .mock-block-2 {
        background: #fab2c1;
        min-height: 58px;
        min-width: 58px;
        height: 100%;
        width: 100%;
      }
      .mock-block-3 {
        background: #efa270;
        min-height: 34px;
        min-width: 34px;
        height: 100%;
        width: 100%;
      }
      .mock-block-4 {
        background: #f2e1ae;
        min-height: 20px;
        min-width: 20px;
        height: 100%;
        width: 100%;
      }
      .mock-block-5 {
        background: #8f9294;
        min-height: 10px;
        min-width: 10px;
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class VtsDemoSpaceHorizontalAlignComponent {}
