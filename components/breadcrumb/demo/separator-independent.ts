import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-separator-independent',
  template: `
    <vts-breadcrumb [vtsSeparator]="null">
      <vts-breadcrumb-item>Location</vts-breadcrumb-item>
      <vts-breadcrumb-separator>:</vts-breadcrumb-separator>
      <vts-breadcrumb-item>
        <a>Application Center</a>
      </vts-breadcrumb-item>
      <vts-breadcrumb-separator>/</vts-breadcrumb-separator>
      <vts-breadcrumb-item>Application List</vts-breadcrumb-item>
      <vts-breadcrumb-separator>/</vts-breadcrumb-separator>
      <vts-breadcrumb-item>An Application</vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbSeparatorIndependentComponent {}
