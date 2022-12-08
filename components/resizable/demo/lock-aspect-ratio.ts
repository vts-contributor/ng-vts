import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-lock-aspect-ratio',
  template: `
    <div
      class="box"
      vts-resizable
      vtsLockAspectRatio
      (vtsResize)="onResize($event)"
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
export class VtsDemoResizableLockAspectRatioComponent {
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
