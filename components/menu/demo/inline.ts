import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-inline',
  template: `
    <ul vts-menu vtsMode="inline">
      <li vts-submenu vtsTitle="Navigation One" vtsIcon="mail" vtsOpen>
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
              <li vts-submenu vtsTitle="Submenu">
                <ul>
                  <li vts-menu-item>Option 9</li>
                  <li vts-menu-item>Option 10</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-submenu vtsTitle="Navigation Three" vtsIcon="setting">
        <ul>
          <li vts-menu-item>Option 11</li>
          <li vts-menu-item>Option 12</li>
          <li vts-menu-item>Option 13</li>
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
export class VtsDemoMenuInlineComponent {}
