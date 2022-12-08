import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-space-align',
  template: `
    <div class="space-align-container">
      <div vts-space vtsAlign="center" class="space-align-block">
        <ng-container *vtsSpaceItem>center</ng-container>
        <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
        <span *vtsSpaceItem class="mock-block">Block</span>
      </div>

      <div vts-space vtsAlign="start" class="space-align-block">
        <ng-container *vtsSpaceItem>start</ng-container>
        <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
        <span *vtsSpaceItem class="mock-block">Block</span>
      </div>

      <div vts-space vtsAlign="end" class="space-align-block">
        <ng-container *vtsSpaceItem>end</ng-container>
        <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
        <span *vtsSpaceItem class="mock-block">Block</span>
      </div>

      <div vts-space vtsAlign="baseline" class="space-align-block">
        <ng-container *vtsSpaceItem>baseline</ng-container>
        <button *vtsSpaceItem vts-button vtsType="primary">Button</button>
        <span *vtsSpaceItem class="mock-block">Block</span>
      </div>
    </div>
  `,
  styles: [
    `
      .space-align-container {
        display: flex;
        align-item: flex-start;
        flex-wrap: wrap;
      }
      .space-align-block {
        margin: 8px 4px;
        border: 1px solid #40a9ff;
        padding: 4px;
        flex: none;
      }
      .space-align-block .mock-block {
        display: inline-block;
        padding: 32px 8px 16px;
        background: rgba(150, 150, 150, 0.2);
      }
    `
  ]
})
export class VtsDemoSpaceAlignComponent {}
