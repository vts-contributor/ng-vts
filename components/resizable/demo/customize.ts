import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-customize',
  template: `
    <div
      class="box"
      vts-resizable
      (vtsResize)="onResize($event)"
      [style.height.px]="height"
      [style.width.px]="width"
    >
      content
      <vts-resize-handle vtsDirection="bottomRight">
        <i class="bottom-right" vts-icon vtsType="ArrowMiniUp" [vtsRotate]="135"></i>
      </vts-resize-handle>
      <vts-resize-handle vtsDirection="right">
        <div class="right-wrap">
          <i class="right" vts-icon vtsType="more"></i>
        </div>
      </vts-resize-handle>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 200px;
      }

      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
        border: 1px solid #ddd;
      }

      .bottom-right {
        position: absolute;
        top: 0;
        left: 0;
      }

      .right-wrap {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .right {
        background: #fff;
        border: 1px solid #ddd;
        text-align: center;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    `
  ]
})
export class VtsDemoResizableCustomizeComponent {
  width = 400;
  height = 200;
  id = -1;

  onResize({ width, height }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
