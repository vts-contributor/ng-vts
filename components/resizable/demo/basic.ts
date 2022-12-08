import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-basic',
  template: `
    <div
      class="box"
      vts-resizable
      [vtsMaxWidth]="600"
      [vtsMinWidth]="80"
      [vtsMaxHeight]="200"
      [vtsMinHeight]="80"
      [vtsDisabled]="disabled"
      [style.height.px]="height"
      [style.width.px]="width"
      (vtsResize)="onResize($event)"
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
export class VtsDemoResizableBasicComponent {
  width = 400;
  height = 200;
  id = -1;
  disabled = false;

  onResize({ width, height }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
