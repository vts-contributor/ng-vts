import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-sider-current',
  template: `
    <ul vts-menu vtsMode="inline" style="width: 240px;">
      <ul
        vts-submenu
        [(vtsOpen)]="openMap.sub1"
        (vtsOpenChange)="openHandler('sub1')"
        vtsTitle="Menu 1"
        vtsIcon="Settings"
      >
        <ul vts-menu-group vtsTitle="Group 1">
          <li vts-menu-item>Option 1</li>
          <li vts-menu-item>Option 2</li>
        </ul>
        <ul vts-menu-group vtsTitle="Group 2">
          <li vts-menu-item>Option 3</li>
          <li vts-menu-item>Option 4</li>
        </ul>
      </ul>
      <ul
        vts-submenu
        [(vtsOpen)]="openMap.sub2"
        (vtsOpenChange)="openHandler('sub2')"
        vtsTitle="Menu 2"
        vtsIcon="Time"
      >
        <li vts-menu-item>Option 5</li>
        <li vts-menu-item>Option 6</li>
        <ul vts-submenu vtsTitle="Submenu">
          <li vts-menu-item>Option 7</li>
          <li vts-menu-item>Option 8</li>
        </ul>
      </ul>
      <ul
        vts-submenu
        [(vtsOpen)]="openMap.sub3"
        (vtsOpenChange)="openHandler('sub3')"
        vtsTitle="Menu 3"
        vtsIcon="Settings"
      >
        <li vts-menu-item>Option 9</li>
        <li vts-menu-item>Option 10</li>
        <li vts-menu-item>Option 11</li>
      </ul>
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
