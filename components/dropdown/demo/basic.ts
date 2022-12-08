import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-basic',
  template: `
    <a vts-dropdown [vtsDropdownMenu]="menu">
      Hover me
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu vtsSelectable>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-item>3rd menu item</li>
        <li vts-menu-item vtsDanger>4th danger item</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoDropdownBasicComponent {}
