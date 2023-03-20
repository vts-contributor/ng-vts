import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-separator',
  template: `
    <h4>String</h4>
    <vts-breadcrumb vtsSeparator=">">
      <vts-breadcrumb-item vtsLabel="Location" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application Center" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application List" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="An Application"></vts-breadcrumb-item>
    </vts-breadcrumb>
    <br />
    <h4>TemplateRef</h4>
    <vts-breadcrumb [vtsSeparator]="iconTemplate">
      <vts-breadcrumb-item vtsLabel="Location" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application Center" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="Application List" [vtsUrl]="['/']"></vts-breadcrumb-item>
      <vts-breadcrumb-item vtsLabel="An Application"></vts-breadcrumb-item>
    </vts-breadcrumb>
    <ng-template #iconTemplate>
      <i vts-icon vtsType="ArrowRight"></i>
    </ng-template>
  `,
  styles: [
    `
      h4:first-child {
        margin-top: 0;
      }

      h4 {
        margin: 16px 0;
        font-size: 16px;
        line-height: 1;
        font-weight: normal;
      }
    `
  ]
})
export class VtsDemoBreadcrumbSeparatorComponent {}
