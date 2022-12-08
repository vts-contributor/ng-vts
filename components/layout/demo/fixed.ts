import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-fixed',
  template: `
    <vts-layout class="layout">
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
      .layout {
        min-height: 100vh;
      }

      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
      }

      vts-header {
        position: fixed;
        width: 100%;
      }

      [vts-menu] {
        line-height: 63px;
      }

      vts-content {
        padding: 0 50px;
        margin-top: 64px;
      }

      vts-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        background: #fff;
        padding: 24px;
        min-height: 380px;
      }

      vts-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsDemoLayoutFixedComponent {}
