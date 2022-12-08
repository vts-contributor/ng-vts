import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-horizontal',
  template: `
    <ul vts-menu vtsMode="horizontal">
      <li vts-menu-item vtsSelected>
        <i vts-icon vtsType="Mail"></i>
        Navigation One
      </li>
      <li vts-menu-item vtsDisabled>
        <i vts-icon vtsType="ViewModule"></i>
        Navigation Two
      </li>
      <li vts-submenu vtsTitle="Navigation Three - Submenu" vtsIcon="setting">
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
              <li vts-submenu vtsTitle="Sub Menu">
                <ul>
                  <li vts-menu-item vtsDisabled>Option 5</li>
                  <li vts-menu-item>Option 6</li>
                </ul>
              </li>
              <li vts-submenu vtsDisabled vtsTitle="Disabled Sub Menu">
                <ul>
                  <li vts-menu-item>Option 5</li>
                  <li vts-menu-item>Option 6</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li vts-menu-item>
        <a href="https://ng.ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </li>
    </ul>
  `
})
export class VtsDemoMenuHorizontalComponent {}
