import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-theme',
  template: `
    <vts-switch [(ngModel)]="theme">
      <span checked>Dark</span>
      <span unchecked>Light</span>
    </vts-switch>
    <br />
    <br />
    <ul vts-menu vtsMode="inline" style="width: 240px;" [vtsTheme]="theme ? 'dark' : 'light'">
      <li vts-submenu vtsOpen vtsTitle="Navigation One" vtsIcon="mail">
        <ul>
          <li vts-menu-group vtsTitle="Item 1">
            <ul>
              <li vts-menu-item vtsSelected>Option 1</li>
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
      <li vts-submenu vtsTitle="Navigation Two" vtsIcon="appstore">
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
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
        <ul>
          <li vts-menu-item>Option 9</li>
          <li vts-menu-item>Option 10</li>
          <li vts-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>
  `
})
export class VtsDemoMenuThemeComponent {
  theme = true;
}
