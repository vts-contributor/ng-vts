import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout>
      <vts-prolayout-header [isFixed]="isFixedHeader" [hasSiderMenu]="hasSiderMenu">
      </vts-prolayout-header>
      <vts-prolayout-content class="outer-content">
        <vts-breadcrumb>
          <vts-breadcrumb-item>Home</vts-breadcrumb-item>
          <vts-breadcrumb-item>List</vts-breadcrumb-item>
          <vts-breadcrumb-item>App</vts-breadcrumb-item>
        </vts-breadcrumb>
        <vts-prolayout class="inner-layout">
          <vts-prolayout-sider vtsWidth="200px" vtsTheme="light" *ngIf="hasSiderMenu">
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
          <vts-setting-drawer (setFixedHeader)="onChangeFixedHeader($event)"></vts-setting-drawer>
        </vts-prolayout>
        <vts-prolayout-footer>NG-VTS</vts-prolayout-footer>
      </vts-prolayout-content>
    </vts-prolayout>
  `,
  styles: [
    `
      .logo {
        width: 120px;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 0 24px;
        float: left;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .header-menu {
        line-height: 63px;
      }

      vts-breadcrumb {
        margin-bottom: 24px;
        margin-left: 24px;
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
export class VtsDemoProlayoutBasicComponent {
  isFixedHeader: boolean = false;
  isFixedSider: boolean = false;
  hasSiderMenu: boolean = true;

  onChangeFixedSider(isFixed: boolean){
    this.isFixedSider = isFixed;
  }

  onChangeFixedHeader(isFixed: boolean){
    this.isFixedHeader = isFixed;
  }
}
