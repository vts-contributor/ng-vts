import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-page-header-breadcrumb',
  template: `
    <vts-page-header class="site-page-header" vtsTitle="Title" vtsSubtitle="This is a subtitle">
      <vts-breadcrumb vts-page-header-breadcrumb>
        <vts-breadcrumb-item>First-level Menu</vts-breadcrumb-item>
        <vts-breadcrumb-item>
          <a>Second-level Menu</a>
        </vts-breadcrumb-item>
        <vts-breadcrumb-item>Third-level Menu</vts-breadcrumb-item>
      </vts-breadcrumb>
    </vts-page-header>
  `
})
export class VtsDemoPageHeaderBreadcrumbComponent {}
