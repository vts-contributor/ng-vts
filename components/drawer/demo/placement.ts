import { Component } from '@angular/core';
import { VtsDrawerPlacement } from '@ui-vts/ng-vts/drawer';

@Component({
  selector: 'vts-demo-drawer-placement',
  template: `
    <vts-radio-group [(ngModel)]="placement">
      <label vts-radio vtsValue="top">top</label>
      <label vts-radio vtsValue="right">right</label>
      <label vts-radio vtsValue="bottom">bottom</label>
      <label vts-radio vtsValue="left">left</label>
    </vts-radio-group>
    <button vts-button vtsType="primary" (click)="open()">Open</button>
    <vts-drawer
      [vtsClosable]="false"
      [vtsVisible]="visible"
      [vtsPlacement]="placement"
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
export class VtsDemoDrawerPlacementComponent {
  visible = false;
  placement: VtsDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
