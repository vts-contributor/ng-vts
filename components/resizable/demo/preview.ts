import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-preview',
  template: `
    <div
      class="box"
      vts-resizable
      vtsPreview
      (vtsResizeEnd)="onResize($event)"
      [style.height.px]="height"
      [style.width.px]="width"
    >
      <vts-resize-handles></vts-resize-handles>
      content
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
    `
  ]
})
export class VtsDemoResizablePreviewComponent {
  width = 400;
  height = 200;

  onResize({ width, height }: VtsResizeEvent): void {
    this.width = width!;
    this.height = height!;
  }
}
