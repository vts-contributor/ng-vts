import { Component } from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import { AvatarMenu, AvatarUser, MenuItemProLayout } from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout-container [vtsMenuHeader]="menuData" [vtsMenuSider]="menuData" [vtsAvatar]="avatar" [vtsAvatarMenu]="avatarMenu" [vtsLogoUrl]="logoUrl" [vtsBreadcrumbArray]="arrayMenuItem">
      Content
    </vts-prolayout-container>
  `
})
export class VtsDemoProlayoutBasicComponent {
  menuData: MenuItemProLayout[] = [
    {
      title: 'Parent 1',
      children: [
        {
          title: 'Child 1.1',
          children: [{ title: 'Child 1.1.1' }, { title: 'Child 1.1.2', isSelected: true, url: "/" }],
          isOpen: true
        },
        { title: 'Child 1.2' }
      ],
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

  avatar: AvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution',
    imgUrl: "http://localhost/avatar_design.svg"
  };
  avatarMenu: AvatarMenu[] = [
    {
      label: 'Quản lý tài khoản',
      url: '/'
    },
    {
      label: 'Logout',
      url: ''
    }
  ];
  logoUrl: string = "http://localhost:4200/logo.svg";

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
}
