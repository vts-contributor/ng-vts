import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-horizontal',
  template: `
    <ul vts-menu vtsMode="horizontal">
      <ul vts-submenu vtsTitle="Menu 1" vtsIcon="Settings">
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
      <li vts-menu-item>Menu 2</li>
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
            <li vts-menu-item>
              <i vts-icon vtsType="Time"></i>
              Option 1
            </li>
          </ul>
        </ul>
      </ul>
      <ul vts-submenu vtsTitle="Menu 4" vtsIcon="Settings">
        <ul vts-menu-group vtsTitle="Group 1">
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
              <li vts-menu-item>
                <i vts-icon vtsType="Time"></i>
                Option 1
              </li>
            </ul>
          </ul>
        </ul>
        <ul vts-menu-group vtsTitle="Group 2">
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
              <li vts-menu-item>
                <i vts-icon vtsType="Time"></i>
                Option 1
              </li>
            </ul>
          </ul>
        </ul>
        <ul vts-menu-group vtsTitle="Group 3">
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
              <li vts-menu-item>
                <i vts-icon vtsType="Time"></i>
                Option 1
              </li>
            </ul>
          </ul>
        </ul>
      </ul>
    </ul>
  `
})
export class VtsDemoMenuHorizontalComponent {}
