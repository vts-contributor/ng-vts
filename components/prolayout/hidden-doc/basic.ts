import { Component } from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import {
  VtsAvatarMenu,
  VtsAvatarUser,
  VtsMenuItemProLayout,
  VtsNotificationConfig,
  VtsProlayoutService
} from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout-container
      [vtsMenuSider]="menuData"
      [vtsAvatar]="avatar"
      [vtsAvatarMenu]="avatarMenu"
      [vtsLogoUrl]="logoUrl"
      [vtsBreadcrumbArray]="arrayMenuItem"
      [vtsFooterTemplate]="footerTemplate"
      [vtsNotificationConfig]="vtsNotificationConfig"
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
      <div>Copyright by Viettel Solution - Government Solution Center Platform</div>
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
    `
  ]
})
export class VtsDemoProlayoutBasicComponent {
  constructor(private service: VtsProlayoutService) {
    this.service.onChangeNotification(10);
    this.service.visiblePaneChange$.subscribe(visible => {
      this.vtsVisibleNotifyPane = visible;
    });
  }

  menuData: VtsMenuItemProLayout[] = [
    {
      title: 'Parent 1',
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
    },
    {
      title: 'Parent 2',
      children: [
        { title: 'Child 2.1', children: [{ title: 'Child 2.1.1' }, { title: 'Child 2.1.2' }] },
        { title: 'Child 2.2' }
      ]
    },
    {
      title: 'Parent 3',
      children: [
        { title: 'Child 3.1', children: [{ title: 'Child 3.1.1' }, { title: 'Child 3.1.2' }] },
        { title: 'Child 3.2' }
      ]
    }
  ];

  avatar: VtsAvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution',
    imgUrl: 'http://localhost/avatar_design.svg'
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
}
