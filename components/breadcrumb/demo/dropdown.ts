import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-dropdown',
  template: `
    <vts-breadcrumb>
      <vts-breadcrumb-item>Ant Design</vts-breadcrumb-item>
      <vts-breadcrumb-item>
        <a>Component</a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item [vtsOverlay]="menu">
        <a href>An Application</a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item>Button</vts-breadcrumb-item>
    </vts-breadcrumb>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu vtsSelectable>
        <li vts-menu-item>General</li>
        <li vts-menu-item>Layout</li>
        <li vts-menu-item>Navigation</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoBreadcrumbDropdownComponent {}
