import { Component } from '@angular/core';
import { VtsResizeEvent } from '@ui-vts/ng-vts/resizable';

@Component({
  selector: 'vts-demo-resizable-drawer',
  template: `
    <button vts-button vtsType="primary" (click)="open()">Open</button>
    <vts-drawer
      [vtsClosable]="false"
      [vtsVisible]="visible"
      [vtsBodyStyle]="{
        padding: 0,
        height: 'calc(100vh - 55px)'
      }"
      [vtsWidth]="width"
      vtsPlacement="left"
      vtsTitle="Resizable Drawer"
      (vtsOnClose)="close()"
    >
      <div
        *ngIf="visible"
        class="drawer-body"
        vts-resizable
        vtsBounds="window"
        [vtsMinWidth]="256"
        (vtsResize)="onResize($event)"
      >
        <vts-resize-handles [vtsDirections]="['right']"></vts-resize-handles>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </div>
    </vts-drawer>
  `,
  styles: [
    `
      .drawer-body {
        width: 100%;
        height: 100%;
        padding: 24px;
      }
    `
  ]
})
export class VtsDemoResizableDrawerComponent {
  width = 256;
  visible = false;
  id = -1;

  onResize({ width }: VtsResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
