import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import {
  VtsAvatarMenu,
  VtsAvatarUser,
  VtsMenuItemProLayout,
  VtsNotificationConfig,
  VtsProlayoutService
} from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-custom-menu-avatar',
  template: `
    <vts-prolayout-container
      [vtsMenuHeader]="[]"
      [vtsMenuSider]="menuData"
      [vtsAvatar]="avatar"
      [vtsLogoUrl]="logoUrl"
      [vtsBreadcrumbArray]="arrayMenuItem"
      [vtsFooterTemplate]="footerTemplate"
      [vtsNotificationConfig]="vtsNotificationConfig"
      [vtsMenuAvatarTemplateRef]="menuAvatar"
      [vtsMenuTemplate]="menuTemplate"
    >
      <ng-template #menuTemplate>
        <ul vts-menu>
          <li vts-menu-item>1st menu item</li>
          <li vts-menu-item>2nd menu item</li>
          <li vts-menu-item vtsDisabled>disabled menu item</li>
          <li vts-submenu vtsTitle="sub menu">
            <ul>
              <li vts-menu-item>3rd menu item</li>
              <li vts-menu-item>4th menu item</li>
            </ul>
          </li>
          <li vts-submenu vtsDisabled vtsTitle="disabled sub menu">
            <ul>
              <li vts-menu-item>3rd menu item</li>
              <li vts-menu-item>4th menu item</li>
            </ul>
          </li>
        </ul>
      </ng-template>
    </vts-prolayout-container>
    <ng-template #footerTemplate>
      <div (click)="openSettingDrawer()">
        Copyright by Viettel Solution - Government Solution Center Platform
      </div>
    </ng-template>
    <ng-template #menuAvatar>
      <ul vts-menu vtsSelectable>
        <li vts-menu-item [vtsSelected]="isOpenSettingDrawer" (click)="openSettingDrawer()">
          Open setting
        </li>
      </ul>
    </ng-template>
  `,
  styles: [
    `
      .main-row {
        overflow-x: hidden;
      }

      ::ng-deep .code-box {
        height: 800px;
      }

      ::ng-deep .vts-setting-drawer-content .vts-drawer-body {
        padding: 30px 64px;
      }
    `
  ]
})
export class VtsDemoProlayoutCustomMenuAvatarComponent {
  constructor(private service: VtsProlayoutService, private router: Router) {
    this.service.onChangeNotification(10);
    this.service.visiblePaneChange$.subscribe(visible => {
      this.vtsVisibleNotifyPane = visible;
    });
    this.service.settingDrawerStateChange$.subscribe(visible => {
      this.isOpenSettingDrawer = visible;
    });
  }

  menuData: VtsMenuItemProLayout[] = [
    {
      title: 'Parent 1',
      icon: 'Home:vts',
      children: [
        {
          title: 'Child 1.1',
          children: [
            { title: 'Child 1.1.1', url: '/components/prolayout/en' },
            { title: 'Child 1.1.2', url: '' }
          ]
        },
        { title: 'Child 1.2' }
      ]
      // isOpen: true
    },
    {
      title: 'Parent 2',
      icon: 'LayerOutline:vts',
      children: [
        { title: 'Child 2.1', children: [{ title: 'Child 2.1.1' }, { title: 'Child 2.1.2' }] },
        { title: 'Child 2.2' }
      ]
    },
    {
      title: 'Parent 3',
      icon: 'ViewWeekOutline:vts',
      children: [
        { title: 'Child 3.1', children: [{ title: 'Child 3.1.1' }, { title: 'Child 3.1.2' }] },
        { title: 'Child 3.2' }
      ]
    }
  ];

  avatar: VtsAvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution'
    // imgUrl: 'http://localhost/avatar_design.svg'
  };
  avatarMenu: VtsAvatarMenu[] = [
    {
      label: 'Quản lý tài khoản',
      url: '/'
    },
    {
      label: 'Logout',
      url: ''
    }
  ];
  logoUrl: string = 'http://localhost/logo.svg';

  arrayMenuItem: VtsBreadcrumbItem[] = [
    { label: 'Home', url: '', icon: 'HomeOutline' },
    { label: 'Content', url: '', icon: 'LayerOutline', disabled: true },
    { label: 'An Application', url: ['/components', 'button', 'en'], icon: 'ViewWeekOutline' },
    { label: 'Application 1' }
  ];
  isCollapsed = false;
  isOpenSettingDrawer: boolean = false;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  vtsVisibleNotifyPane: boolean = false;
  vtsNotificationConfig: VtsNotificationConfig = {
    type: 'menuContext',
    overflowCount: 99
  };

  close() {
    this.vtsVisibleNotifyPane = false;
  }

  onClickAvatarMenuItem(item: VtsAvatarMenu): void {
    this.router.navigateByUrl(item.url);
  }

  openSettingDrawer() {
    this.service.onChangeSettingDrawerState(true);
  }
}
