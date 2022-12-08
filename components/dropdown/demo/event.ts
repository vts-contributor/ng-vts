import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-event',
  template: `
    <a vts-dropdown [vtsDropdownMenu]="menu">
      Hover me, Click menu item
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item (click)="log('1st menu item')">1st menu item</li>
        <li vts-menu-item (click)="log('2nd menu item')">2nd menu item</li>
        <li vts-menu-item (click)="log('3rd menu item')">3rd menu item</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoDropdownEventComponent {
  log(data: string): void {
    console.log(data);
  }
}
