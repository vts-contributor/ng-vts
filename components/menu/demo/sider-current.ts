import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-sider-current',
  template: `
    <ul vts-menu vtsMode="inline" style="width: 240px;">
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub1"
        (vtsOpenChange)="openHandler('sub1')"
        vtsTitle="Navigation One"
        vtsIcon="Mail"
      >
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item>Option 1</li>
              <li vts-menu-item>Option 2</li>
            </ul>
          </li>
          <li vts-menu-group vtsTitle="Item 2">
            <ul>
              <li vts-menu-item>Option 3</li>
              <li vts-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub2"
        (vtsOpenChange)="openHandler('sub2')"
        vtsTitle="Navigation Two"
        vtsIcon="Extension"
      >
        <ul>
          <li vts-menu-item>Option 5</li>
          <li vts-menu-item>Option 6</li>
          <li vts-submenu vtsTitle="Submenu">
            <ul>
              <li vts-menu-item>Option 7</li>
              <li vts-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        vts-submenu
        [(vtsOpen)]="openMap.sub3"
        (vtsOpenChange)="openHandler('sub3')"
        vtsTitle="Navigation Three"
        vtsIcon="Settings"
      >
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsDemoMenuSiderCurrentComponent {
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
}
