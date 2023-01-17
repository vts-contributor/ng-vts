import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-separator-independent',
  template: `
    <vts-breadcrumb [vtsSeparator]="null">
      <vts-breadcrumb-item vtsLabel="Location" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-separator>❯❯❯❯</vts-breadcrumb-separator>
      <vts-breadcrumb-item vtsLabel="Application Center" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-separator>❯❯</vts-breadcrumb-separator>
      <vts-breadcrumb-item vtsLabel="Application List" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-separator>❯❯</vts-breadcrumb-separator>
      <vts-breadcrumb-item vtsLabel="An Application"></vts-breadcrumb-item>
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbSeparatorIndependentComponent {}
