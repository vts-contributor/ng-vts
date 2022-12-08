import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-spin-size',
  template: `
    <vts-spin vtsSimple [vtsSize]="'sm'"></vts-spin>
    <vts-spin vtsSimple></vts-spin>
    <vts-spin vtsSimple [vtsSize]="'lg'"></vts-spin>
  `,
  styles: [
    `
      vts-spin {
        display: inline-block;
        margin-right: 16px;
      }
    `
  ]
})
export class VtsDemoSpinSizeComponent {}
