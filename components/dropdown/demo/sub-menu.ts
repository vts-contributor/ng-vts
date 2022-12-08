import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-sub-menu',
  template: `
    <a vts-dropdown [vtsDropdownMenu]="menu" (vtsVisibleChange)="change($event)">
      Cascading menu
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
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
export class VtsDemoDropdownSubMenuComponent {
  change(value: boolean): void {
    console.log(value);
  }
}
