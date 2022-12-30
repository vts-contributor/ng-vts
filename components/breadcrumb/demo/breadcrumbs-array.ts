import { Component } from '@angular/core';
import { Params } from '@angular/router';

interface BreadcrumbItem {
  label: string;
  params: Params;
  url: string;
  icon?: string
}

@Component({
  selector: 'vts-demo-breadcrumb-breadcrumbs-array',
  template: `
    <vts-breadcrumb [vtsBreadcrumbArray]="arrayMenuItem"></vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbBreadcrumbsArrayComponent {
  arrayMenuItem: BreadcrumbItem[] = [
    { label: 'Home', params: {}, url: '', icon: ''},
    { label: 'Content', params: {}, url: '', icon: ''},
    { label: 'Application', params: {}, url: '', icon: ''}
  ];
}
