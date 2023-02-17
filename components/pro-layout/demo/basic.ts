import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pro-layout-basic',
  template: `
    <vts-pro-layout>
      <vts-prolayout-header>Header</vts-prolayout-header>
      <vts-prolayout-content>Content</vts-prolayout-content>
      <vts-prolayout-footer>Footer</vts-prolayout-footer>
      <vts-setting-drawer></vts-setting-drawer>
    </vts-pro-layout>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }

      vts-header,
      vts-footer {
        background: #7dbcea;
        color: #fff;
      }

      vts-footer {
        line-height: 1.5;
      }

      vts-sider {
        background: #3ba0e9;
        color: #fff;
        line-height: 120px;
      }

      vts-content {
        background: rgba(16, 142, 233, 1);
        color: #fff;
        min-height: 120px;
        line-height: 120px;
      }

      vts-layout {
        margin-bottom: 48px;
      }

      vts-layout:last-child {
        margin: 0;
      }
    `
  ]
})
export class VtsDemoProLayoutBasicComponent {}
