import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popconfirm-hide-arrow',
  template: `
    <a vts-popconfirm vtsPopconfirmTitle="Are you sure?" [vtsPopconfirmShowArrow]="false">Delete</a>
  `
})
export class VtsDemoPopconfirmHideArrowComponent {}
