import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-drawer-basic-right',
  template: `
    <button vts-button vtsType="primary" (click)="open()">Open</button>
    <vts-drawer
      [vtsClosable]="false"
      [vtsVisible]="visible"
      vtsPlacement="right"
      vtsTitle="Basic Drawer"
      (vtsOnClose)="close()"
    >
      <ng-container *vtsDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </vts-drawer>
  `
})
export class VtsDemoDrawerBasicRightComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
