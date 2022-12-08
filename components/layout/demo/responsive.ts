import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-responsive',
  template: `
    <vts-layout class="layout">
      <vts-sider vtsCollapsible vtsBreakpoint="lg" [vtsCollapsedWidth]="0">
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="inline">
          <li vts-menu-item>
            <i vts-icon vtsType="UserOutline"></i>
            <span>nav 1</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="CameraEnhanceDoutone"></i>
            <span>nav 2</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="UploadCloud"></i>
            <span>nav 3</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="UserOutline"></i>
            <span>nav 4</span>
          </li>
        </ul>
      </vts-sider>
      <vts-layout>
        <vts-header></vts-header>
        <vts-content>
          <div class="inner-content">Content</div>
        </vts-content>
        <vts-footer>NG-VTS</vts-footer>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
      }

      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      vts-header {
        background: #fff;
        padding: 0;
      }

      vts-content {
        margin: 24px 16px 0;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        min-height: 360px;
      }

      vts-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsDemoLayoutResponsiveComponent {}
