import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-dropdown-button',
  template: `
    <vts-button-group>
      <button vts-button (click)="log()">DropDown</button>
      <button vts-button vts-dropdown [vtsDropdownMenu]="menu1" vtsPlacement="bottomRight">
        <i vts-icon vtsType="ViewHeadline"></i>
      </button>
    </vts-button-group>
    <vts-button-group>
      <button vts-button (click)="log()">DropDown</button>
      <button vts-button vts-dropdown [vtsDropdownMenu]="menu2" vtsPlacement="bottomRight">
        <i vts-icon vtsType="UserOutline"></i>
      </button>
    </vts-button-group>
    <vts-button-group>
      <button vts-button disabled>DropDown</button>
      <button vts-button disabled vts-dropdown [vtsDropdownMenu]="menu3" vtsPlacement="bottomRight">
        <i vts-icon vtsType="ViewHeadline"></i>
      </button>
    </vts-button-group>
    <button vts-button vts-dropdown [vtsDropdownMenu]="menu4">
      Button
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </button>
    <vts-dropdown-menu #menu1="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>menu1 1st menu item</li>
        <li vts-menu-item>menu1 2nd menu item</li>
        <li vts-menu-item>menu1 3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
    <vts-dropdown-menu #menu2="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>menu2 1st menu item</li>
        <li vts-menu-item>menu2 2nd menu item</li>
        <li vts-menu-item>menu2 3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
    <vts-dropdown-menu #menu3="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>menu3 1st menu item</li>
        <li vts-menu-item>menu3 2nd menu item</li>
        <li vts-menu-item>menu3 3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
    <vts-dropdown-menu #menu4="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>menu4 1st menu item</li>
        <li vts-menu-item>menu4 2nd menu item</li>
        <li vts-menu-item>menu4 3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      vts-button-group {
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class VtsDemoDropdownDropdownButtonComponent {
  log(): void {
    console.log('click dropdown button');
  }
}
