import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-layout',
  template: `
    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-layout>
        <vts-sider
          [vtsWidth]="siderWidth"
          vts-resizable
          [vtsMinWidth]="50"
          [vtsMaxWidth]="300"
          (vtsResize)="onSideResize($event)"
        >
          <vts-resize-handle vtsDirection="right">
            <div class="sider-resize-line"></div>
          </vts-resize-handle>
          Sider
        </vts-sider>
        <vts-content>
          <div
            vts-resizable
            class="resizable-box"
            [style.height.px]="contentHeight"
            [vtsMaxHeight]="300"
            [vtsMinHeight]="50"
            (vtsResize)="onContentResize($event)"
          >
            <vts-resize-handle vtsDirection="bottom">
              <div class="content-resize-line"></div>
            </vts-resize-handle>
            Content 1
          </div>
          <div>Content 2</div>
        </vts-content>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      vts-header {
        background: #7dbcea;
        color: #fff;
      }
      vts-sider {
        background: #3ba0e9;
        color: #fff;
      }

      vts-sider.vts-resizable-resizing {
        transition: none;
      }

      vts-content {
        display: flex;
        flex-direction: column;
        background: rgba(16, 142, 233, 1);
        height: 350px;
        color: #fff;
      }

      vts-content > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      vts-content .resizable-box {
        flex: none;
      }

      vts-content,
      vts-header,
      ::ng-deep vts-sider > .vts-layout-sider-children {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sider-resize-line {
        height: 100%;
        width: 5px;
        border-right: 1px solid #e8e8e8;
      }

      .content-resize-line {
        width: 100%;
        height: 5px;
        border-bottom: 1px solid #e8e8e8;
      }
    `
  ]
})
export class VtsDemoResizableLayoutComponent {
  siderWidth = 120;
  contentHeight = 200;
  id = -1;

  onSideResize({ width }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }

  onContentResize({ height }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.contentHeight = height!;
    });
  }
}
