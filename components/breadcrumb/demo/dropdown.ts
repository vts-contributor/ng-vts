import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-dropdown',
  template: `
    <vts-breadcrumb>
      <vts-breadcrumb-item vtsLabel="Home" vtsIcon="HomeOutline"></vts-breadcrumb-item>
      <vts-breadcrumb-item
        vtsLabel="Content"
        vtsIcon="LayerOutline"
        vtsDisabled
      ></vts-breadcrumb-item>
      <vts-breadcrumb-item
        vtsLabel="An Application"
        vtsIcon="ViewWeekOutline"
        [vtsOverlay]="menu"
      ></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application 1"></vts-breadcrumb-item>
    </vts-breadcrumb>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu vtsSelectable>
        <li vts-menu-item>Application 1</li>
        <li vts-menu-item>Application 2</li>
        <li vts-menu-item>Application 3</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoBreadcrumbDropdownComponent {}
