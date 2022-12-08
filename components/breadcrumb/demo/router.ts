import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-router',
  template: `
    <vts-breadcrumb>
      <vts-breadcrumb-item>
        <a [routerLink]="['../../']">Home</a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item>Breadcrumb</vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbRouterComponent {}
