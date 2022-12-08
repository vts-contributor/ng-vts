import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-layout-custom-trigger',
  template: `
    <vts-layout>
      <vts-sider vtsCollapsible [(vtsCollapsed)]="isCollapsed" [vtsTrigger]="null">
        <div class="logo"></div>
        <ul vts-menu vtsTheme="dark" vtsMode="inline">
          <li vts-submenu vtsTitle="User" vtsIcon="user">
            <ul>
              <li vts-menu-item>Tom</li>
              <li vts-menu-item>Bill</li>
              <li vts-menu-item>Alex</li>
            </ul>
          </li>
          <li vts-submenu vtsTitle="Team" vtsIcon="team">
            <ul>
              <li vts-menu-item>Team 1</li>
              <li vts-menu-item>Team 2</li>
            </ul>
          </li>
          <li vts-menu-item>
            <i vts-icon vtsType="DescriptionOutline"></i>
            <span>File</span>
          </li>
        </ul>
      </vts-sider>
      <vts-layout>
        <vts-header>
          <i
            class="trigger"
            vts-icon
            [vtsType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            (click)="isCollapsed = !isCollapsed"
          ></i>
        </vts-header>
        <vts-content>
          <vts-breadcrumb>
            <vts-breadcrumb-item>User</vts-breadcrumb-item>
            <vts-breadcrumb-item>Bill</vts-breadcrumb-item>
          </vts-breadcrumb>
          <div class="inner-content">Bill is a cat.</div>
        </vts-content>
        <vts-footer>NG-VTS</vts-footer>
      </vts-layout>
    </vts-layout>
  `,
  styles: [
    `
      .trigger {
        font-size: 18px;
        line-height: 63px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }

      .trigger:hover {
        color: #1890ff;
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
        margin: 0 16px;
      }

      vts-breadcrumb {
        margin: 16px 0;
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
export class VtsDemoLayoutCustomTriggerComponent {
  isCollapsed = false;
}
