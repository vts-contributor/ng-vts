import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import { VtsDrawerOptions, VtsDrawerRef } from '@ui-vts/ng-vts/drawer';
import { VtsDropdownMenuComponent } from '@ui-vts/ng-vts/dropdown';
import { VtsAvatarMenu, VtsAvatarUser, VtsMenuItemProLayout, VtsNotificationConfig, VtsProlayoutService } from '@ui-vts/ng-vts/prolayout';

@Component({
  selector: 'vts-demo-prolayout-basic',
  template: `
    <vts-prolayout-container [vtsMenuHeader]="menuData" [vtsMenuSider]="menuData" [vtsAvatar]="avatar" [vtsAvatarMenu]="avatarMenu" [vtsLogoUrl]="logoUrl" [vtsBreadcrumbArray]="arrayMenuItem" [vtsFooterTemplate]="footerTemplate" [vtsVisibleNotifyPane]="vtsVisibleNotifyPane" [vtsNotificationConfig]="vtsNotificationConfig">
    </vts-prolayout-container>
    <!-- default drawer notification pane template -->
    <ng-template #drawerNotiTemplate let-data let-drawerRef="drawerRef">
        value: {{ data?.value }}
        <br />
        <button vts-button vtsType="primary" (click)="drawerRef.close()">close</button>
    </ng-template>

    <!-- default context menu notification pane template -->
    <vts-dropdown-menu #defaultMenu="vtsDropdownMenu">
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
    </vts-dropdown-menu>
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
      <div>
        Copyright by Viettel Solution - Government Solution Center Platform
      </div>
    </ng-template>
  `
})
export class VtsDemoProlayoutBasicComponent implements AfterViewInit {

  constructor(private service: VtsProlayoutService){
    this.service.onChangeNotification(10);
    this.service.visiblePaneChange$.subscribe(visible => {
      this.vtsVisibleNotifyPane = visible;
    })
  }

  menuData: VtsMenuItemProLayout[] = [
    {
      title: 'Parent 1',
      children: [
        {
          title: 'Child 1.1',
          children: [{ title: 'Child 1.1.1', url: "/components/prolayout/en" }, { title: 'Child 1.1.2', isSelected: true, url: "" }],
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

  avatar: VtsAvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution',
    imgUrl: "http://localhost/avatar_design.svg"
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
  logoUrl: string = "http://localhost/logo.svg";

  arrayMenuItem: VtsBreadcrumbItem[] = [
    { label: 'Home', url: '', icon: 'HomeOutline' },
    { label: 'Content', url: '', icon: 'LayerOutline', disabled: true },
    { label: 'An Application', url: ['/components', 'button', 'en'], icon: 'ViewWeekOutline' },
    { label: 'Application 1' }
  ];
  isCollapsed = false;
  // if no context menu config is declared, this config will be used for displaying notification pane
  @ViewChild('defaultMenu') defaultConfigNotiPane: VtsDropdownMenuComponent | null = null;
  // if no drawer config is declared, this config will be used for displaying notification pane
  @ViewChild('drawerNotiTemplate', { static: false }) drawerNotiTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: VtsDrawerRef<string>;
  }>;
  
  private defaultDrawerNotiConfig: VtsDrawerOptions = {
    vtsTitle: 'Template',
    vtsFooter: 'Footer',
    vtsContent: this.drawerNotiTemplate,
    vtsContentParams: {
      value: 'this.value'
    }
  }

  vtsNotificationConfig: VtsNotificationConfig = {
    type: "menuContext",
    menuConfig: this.defaultConfigNotiPane,
    drawerConfig: this.defaultDrawerNotiConfig
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  vtsVisibleNotifyPane: boolean = false;

  ngAfterViewInit(): void {
      let defaultConfig: VtsNotificationConfig = JSON.parse(JSON.stringify(this.vtsNotificationConfig));
      let defaultDrawerNotiConfig: VtsDrawerOptions = JSON.parse(JSON.stringify(this.defaultDrawerNotiConfig));
      defaultDrawerNotiConfig.vtsContent = this.drawerNotiTemplate;
      defaultConfig.drawerConfig = defaultDrawerNotiConfig;
      defaultConfig.menuConfig = this.defaultConfigNotiPane;
      this.vtsNotificationConfig = {
        ...defaultConfig
      }
  }

  close(){
    this.vtsVisibleNotifyPane = false;
  }
}
