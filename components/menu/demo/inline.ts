import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-inline',
  template: `
    <ul vts-menu vtsMode="inline">
      <ul vts-submenu vtsOpen vtsTitle="Menu 1" vtsIcon="Settings">
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item vtsSelected>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
        </ul>
      </ul>
      <li vts-menu-item>
        <i vts-icon vtsType="Time"></i>
        Menu 2
      </li>
      <ul vts-submenu vtsTitle="Menu 3" vtsIcon="Settings">
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          Option 1
        </li>
        <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            Option 1
          </li>
        </ul>
      </ul>
      <li vts-menu-item>
        <i vts-icon vtsType="Time"></i>
        Menu 4
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
