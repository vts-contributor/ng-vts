import { Component } from '@angular/core';
import { AvatarMenu, AvatarUser, MenuItemProLayout } from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout-container [menuHeader]="menuData" [menuSider]="menuData" [avatar]="avatar" [avatarMenu]="avatarMenu" [logoUrl]="logoUrl">
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
      isOpen: true
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
    imgUrl: "http://localhost:4200/avatar_design.svg"
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
}
