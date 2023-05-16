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
  selector: 'vts-demo-prolayout-drawer-notify',
  template: `
    <vts-prolayout-container
      [vtsMenuHeader]="menuData"
      [vtsMenuSider]="menuData"
      [vtsAvatar]="avatar"
      [vtsAvatarMenu]="avatarMenu"
      [vtsLogoUrl]="logoUrl"
      [vtsBreadcrumbArray]="arrayMenuItem"
      [vtsFooterTemplate]="footerTemplate"
      [vtsVisibleNotifyPane]="vtsVisibleNotifyPane"
      [vtsNotificationConfig]="vtsNotificationConfig"
    ></vts-prolayout-container>

    <vts-drawer
      [vtsClosable]="false"
      [vtsVisible]="vtsVisibleNotifyPane"
      vtsPlacement="right"
      vtsTitle="Basic Drawer"
      (vtsOnClose)="close()"
    >
      <ng-container *vtsDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </vts-drawer>
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
export class VtsDemoProlayoutDrawerNotifyComponent {
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
      // isOpen: true
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
    type: 'drawer',
    overflowCount: 9
  };

  close() {
    this.vtsVisibleNotifyPane = false;
  }
}
