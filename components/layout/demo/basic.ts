import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-basic',
  template: `
    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-content>Content</vts-content>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-layout>
        <vts-sider>Sider</vts-sider>
        <vts-content>Content</vts-content>
      </vts-layout>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-header>Header</vts-header>
      <vts-layout>
        <vts-content>Content</vts-content>
        <vts-sider>Sider</vts-sider>
      </vts-layout>
      <vts-footer>Footer</vts-footer>
    </vts-layout>

    <vts-layout>
      <vts-sider>Sider</vts-sider>
      <vts-layout>
        <vts-header>Header</vts-header>
        <vts-content>Content</vts-content>
        <vts-footer>Footer</vts-footer>
      </vts-layout>
    </vts-layout>
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
export class VtsDemoLayoutBasicComponent {}
