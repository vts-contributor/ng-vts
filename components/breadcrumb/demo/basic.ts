import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-basic',
  template: `
    <vts-breadcrumb>
      <vts-breadcrumb-item>Home</vts-breadcrumb-item>
      <vts-breadcrumb-item>
        <a>Application List</a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item>An Application</vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbBasicComponent {}
