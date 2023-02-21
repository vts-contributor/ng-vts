import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
  <div class="test-prolayout">
    <vts-prolayout>
      <vts-prolayout-header>
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="horizontal" class="header-menu">
          <li vts-menu-item>nav 1</li>
          <li vts-menu-item vtsSelected>nav 2</li>
          <li vts-menu-item>nav 3</li>
        </ul>
      </vts-prolayout-header>
      <vts-prolayout-content class="outer-content">
        <vts-breadcrumb>
          <vts-breadcrumb-item>Home</vts-breadcrumb-item>
          <vts-breadcrumb-item>List</vts-breadcrumb-item>
          <vts-breadcrumb-item>App</vts-breadcrumb-item>
        </vts-breadcrumb>
        <vts-prolayout class="inner-layout">
          <vts-prolayout-sider vtsWidth="200px" vtsTheme="light">
            <ul vts-menu vtsMode="inline" class="sider-menu">
              <li vts-submenu vtsOpen vtsTitle="subnav 1" vtsIcon="user">
                <ul>
                  <li vts-menu-item vtsSelected>option1</li>
                  <li vts-menu-item>option2</li>
                  <li vts-menu-item>option3</li>
                  <li vts-menu-item>option4</li>
                </ul>
              </li>
              <li vts-submenu vtsTitle="subnav 2" vtsIcon="laptop">
                <ul>
                  <li vts-menu-item>option5</li>
                  <li vts-menu-item>option6</li>
                  <li vts-menu-item>option7</li>
                  <li vts-menu-item>option8</li>
                </ul>
              </li>
              <li vts-submenu vtsTitle="subnav 3" vtsIcon="notification">
                <ul>
                  <li vts-menu-item>option9</li>
                  <li vts-menu-item>option10</li>
                  <li vts-menu-item>option11</li>
                  <li vts-menu-item>option12</li>
                </ul>
              </li>
            </ul>
          </vts-prolayout-sider>
          <vts-prolayout-content class="inner-content">Content</vts-prolayout-content>
          <vts-setting-drawer></vts-setting-drawer>
        </vts-prolayout>
        <vts-prolayout-footer>NG-VTS</vts-prolayout-footer>
      </vts-prolayout-content>
    </vts-prolayout>
  </div>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
      }

      .header-menu {
        line-height: 63px;
      }

      .outer-content {
        padding: 0 50px;
      }

      vts-breadcrumb {
        margin: 16px 0;
      }

      .inner-layout {
        background: #fff;
      }

      .sider-menu {
        height: 100%;
      }

      .inner-content {
        padding: 0 24px;
        min-height: 280px;
      }

      vts-prolayout-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsDemoProlayoutBasicComponent {}
