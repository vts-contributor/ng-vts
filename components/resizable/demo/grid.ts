import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-grid',
  template: `
    <div vts-row>
      <div
        class="col"
        vts-col
        vts-resizable
        (vtsResize)="onResize($event)"
        [vtsMinColumn]="3"
        [vtsMaxColumn]="20"
        [vtsGridColumnCount]="24"
        [vtsSpan]="col"
      >
        <vts-resize-handles [vtsDirections]="['right']"></vts-resize-handles>
        col-{{ col }}
      </div>
      <div class="col right" vts-col [vtsSpan]="24 - col">col-{{ 24 - col }}</div>
    </div>
  `,
  styles: [
    `
      .col {
        padding: 16px 0;
        text-align: center;
        border-radius: 0;
        min-height: 30px;
        margin-top: 8px;
        margin-bottom: 8px;
        background: rgba(0, 160, 233, 0.7);
        color: #fff;
      }

      .col.right {
        background: #00a0e9;
      }
    `
  ]
})
export class VtsDemoResizableGridComponent {
  col = 8;
  id = -1;

  onResize({ col }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.col = col!;
    });
  }
}
