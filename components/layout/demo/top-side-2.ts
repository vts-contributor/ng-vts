import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-top-side-2',
  template: `
    <vts-layout>
      <vts-header>
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="horizontal" class="header-menu">
          <li vts-menu-item vtsSelected>nav 1</li>
          <li vts-menu-item>nav 2</li>
          <li vts-menu-item>nav 3</li>
        </ul>
      </vts-header>
      <vts-layout>
        <vts-sider vtsWidth="200px" vtsTheme="light">
          <ul vts-menu vtsMode="inline" class="sider-menu">
            <li vts-submenu vtsOpen vtsIcon="user" vtsTitle="subnav 1">
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
        </vts-sider>
        <vts-layout class="inner-layout">
          <vts-breadcrumb>
            <vts-breadcrumb-item>Home</vts-breadcrumb-item>
            <vts-breadcrumb-item>List</vts-breadcrumb-item>
            <vts-breadcrumb-item>App</vts-breadcrumb-item>
          </vts-breadcrumb>
          <vts-content>Content</vts-content>
        </vts-layout>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 30px 16px 0;
        float: left;
      }

      .header-menu {
        line-height: 63px;
      }

      .sider-menu {
        height: 100%;
        border-right: 0;
      }

      .inner-layout {
        padding: 0 24px 24px;
      }

      vts-breadcrumb {
        margin: 16px 0;
      }

      vts-content {
        background: #fff;
        padding: 24px;
        min-height: 280px;
      }
    `
  ]
})
export class VtsDemoLayoutTopSide2Component {}
