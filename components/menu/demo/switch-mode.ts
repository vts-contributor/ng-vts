import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-switch-mode',
  template: `
    <vts-switch [(ngModel)]="mode"></vts-switch>
    Change Mode
    <vts-divider vtsType="vertical"></vts-divider>
    <vts-switch [(ngModel)]="dark"></vts-switch>
    Change Theme
    <br />
    <br />
    <ul vts-menu [vtsMode]="mode ? 'vertical' : 'inline'" [vtsTheme]="dark ? 'dark' : 'light'">
      <li vts-submenu vtsTitle="Navigation One" vtsIcon="Mail">
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
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="Extension">
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
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="Settings">
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `,
  styles: [
    `
      [vts-menu] {
        width: 240px;
      }
    `
  ]
})
export class VtsDemoMenuSwitchModeComponent {
  mode = false;
  dark = false;
}
