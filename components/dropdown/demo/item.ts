import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-item',
  template: `
    <a vts-dropdown [vtsDropdownMenu]="menu">
      Hover me
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-divider></li>
        <li vts-menu-item vtsDisabled>3rd menu item（disabled）</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoDropdownItemComponent {}
