import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-top',
  template: `
    <vts-layout>
      <vts-header>
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="horizontal">
          <li vts-menu-item>nav 1</li>
          <li vts-menu-item>nav 2</li>
          <li vts-menu-item>nav 3</li>
        </ul>
      </vts-header>
      <vts-content>
        <vts-breadcrumb>
          <vts-breadcrumb-item>Home</vts-breadcrumb-item>
          <vts-breadcrumb-item>List</vts-breadcrumb-item>
          <vts-breadcrumb-item>App</vts-breadcrumb-item>
        </vts-breadcrumb>
        <div class="inner-content">Content</div>
      </vts-content>
      <vts-footer>NG-VTS</vts-footer>
    </vts-layout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
      }

      [vts-menu] {
        line-height: 63px;
      }

      vts-breadcrumb {
        margin: 16px 0;
      }

      vts-content {
        padding: 0 50px;
      }

      vts-footer {
        text-align: center;
      }

      .inner-content {
        background: #fff;
        padding: 24px;
        min-height: 280px;
      }
    `
  ]
})
export class VtsDemoLayoutTopComponent {}
