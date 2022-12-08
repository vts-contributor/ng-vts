import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-trigger',
  template: `
    <a vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="menu">
      Click me
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-divider></li>
        <li vts-menu-item vtsDisabled>disabled menu item</li>
        <li vts-submenu vtsTitle="sub menu">
          <ul>
            <li vts-menu-item>3rd menu item</li>
            <li vts-menu-item>4th menu item</li>
          </ul>
        </li>
        <li vts-submenu vtsDisabled vtsTitle="disabled sub menu">
          <ul>
            <li vts-menu-item>3rd menu item</li>
            <li vts-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoDropdownTriggerComponent {}
