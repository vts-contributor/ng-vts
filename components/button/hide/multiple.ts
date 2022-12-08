import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-multiple',
  template: `
    <button vts-button vtsType="primary">primary</button>
    <button vts-button vtsType="default">secondary</button>
    <button vts-button vts-dropdown [vtsDropdownMenu]="menu">
      Actions
      <i vts-icon vtsType="ArrowMiniDown"></i>
    </button>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>
          <a>1st item</a>
        </li>
        <li vts-menu-item>
          <a>2nd item</a>
        </li>
        <li vts-menu-item>
          <a>3rd item</a>
        </li>
      </ul>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoButtonMultipleComponent {}
