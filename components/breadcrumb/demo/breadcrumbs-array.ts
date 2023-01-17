import { Component } from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';

@Component({
  selector: 'vts-demo-breadcrumb-breadcrumbs-array',
  template: `
    <vts-breadcrumb [vtsBreadcrumbArray]="arrayMenuItem"></vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbBreadcrumbsArrayComponent {
  arrayMenuItem: VtsBreadcrumbItem[] = [
    { label: 'Home', url: '', icon: 'HomeOutline' },
    { label: 'Content', url: '', icon: 'LayerOutline', disabled: true },
    { label: 'An Application', url: ['/components', 'button', 'en'], icon: 'ViewWeekOutline' },
    { label: 'Application 1' }
  ];
}
