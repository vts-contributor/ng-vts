import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-dropdown-overlay-visible',
  template: `
    <a vts-dropdown [vtsDropdownMenu]="menu" [vtsClickHide]="false" [(vtsVisible)]="visible">
      Hover me
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </a>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>Clicking me will not close the menu.</li>
        <li vts-menu-item>Clicking me will not close the menu also.</li>
        <li vts-menu-item (click)="visible = false">Clicking me will close the menu</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoDropdownOverlayVisibleComponent {
  visible = false;
}
