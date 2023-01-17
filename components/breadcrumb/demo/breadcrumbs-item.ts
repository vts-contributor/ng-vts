import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-breadcrumbs-item',
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
        [vtsUrl]="['/components', 'button', 'en']"
      ></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application 1"></vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbBreadcrumbsItemComponent {}
