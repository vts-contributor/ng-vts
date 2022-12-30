import { Params } from '@angular/router';
import { Component } from '@angular/core';

interface BreadcrumbItem {
  label: string;
  params: Params;
  url: string;
  icon?: string
}
@Component({
  selector: 'vts-demo-breadcrumb-home',
  template: `
    <vts-breadcrumb [vtsHome]="home" [vtsBreadcrumbArray]="arrayMenuItem">
    </vts-breadcrumb>
  `,
})
export class VtsDemoBreadcrumbHomeComponent {
  arrayMenuItem: BreadcrumbItem[] = [
    { label: 'Home', params: {}, url: ''},
    { label: 'Content', params: {}, url: ''},
    { label: 'Application', params: {}, url: ''}
  ];
  home: BreadcrumbItem = {label: '', params: {}, url: '/home'}
}
