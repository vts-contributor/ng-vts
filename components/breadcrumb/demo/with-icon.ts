import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-with-icon',
  template: `
    <vts-breadcrumb>
      <vts-breadcrumb-item>
        <i vts-icon vtsType="Home"></i>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item>
        <a>
          <i vts-icon vtsType="UserOutline"></i>
          <span>Application List</span>
        </a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-item>Application</vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbWithIconComponent {}
