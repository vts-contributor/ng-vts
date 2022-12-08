import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-fixed-sider',
  template: `
    <vts-layout class="layout">
      <vts-sider>
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="inline">
          <li vts-menu-item>
            <i vts-icon vtsType="DescriptionOutline"></i>
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
            <i vts-icon vtsType="ChartOutline"></i>
            <span>nav 4</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="Global"></i>
            <span>nav 5</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="DashboardOutline"></i>
            <span>nav 6</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="GroupUsersCircle"></i>
            <span>nav 7</span>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="ShoppingCartOutline"></i>
            <span>nav 8</span>
          </li>
        </ul>
      </vts-sider>
      <vts-layout class="right-layout">
        <vts-header></vts-header>
        <vts-content>
          <div class="inner-content">
            ...
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            long
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </div>
        </vts-content>
        <vts-footer>NG-VTS</vts-footer>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
      }

      .layout {
        min-height: 100vh;
      }

      vts-sider {
        overflow: auto;
        height: 100%;
        position: fixed;
        left: 0;
      }

      .right-layout {
        margin-left: 200px;
      }

      vts-header {
        background: #fff;
        padding: 0;
      }

      vts-content {
        margin: 24px 16px 0;
        overflow: initial;
      }

      .inner-content {
        padding: 24px;
        background: #fff;
        text-align: center;
      }

      vts-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsDemoLayoutFixedSiderComponent {}
