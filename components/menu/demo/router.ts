import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-router',
  template: `
    <ul vts-menu vtsMode="horizontal">
      <ul vts-submenu vtsTitle="Menu 1" vtsIcon="Settings">
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', 'uikit', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
        </ul>
      </ul>
      <li vts-menu-item>Menu 2</li>
    </ul>
    <ul vts-menu vtsMode="inline">
      <ul vts-submenu vtsTitle="Menu 1" vtsIcon="Settings">
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <li vtsMatchRouter vts-menu-item>
          <i vts-icon vtsType="Time"></i>
          <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
        </li>
        <ul vts-submenu vtsTitle="Options 2" vtsIcon="Time">
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', 'uikit', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
          <li vtsMatchRouter vts-menu-item>
            <i vts-icon vtsType="Time"></i>
            <a [routerLink]="['/', '123', 'components', 'menu', 'en']">Option 1</a>
          </li>
        </ul>
      </ul>
      <li vts-menu-item>Menu 2</li>
    </ul>
  `,
  styles: [
    `
      .vts-menu-inline {
        margin-top: 30px;
        width: 240px;
      }
    `
  ]
})
export class VtsDemoMenuRouterComponent {}
