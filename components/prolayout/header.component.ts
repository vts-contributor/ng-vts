/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  TemplateRef
} from '@angular/core';
// import { VtsMenuThemeType } from '@ui-vts/ng-vts/menu';
import { AvatarUser, MenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-header',
  exportAs: 'vtsProLayoutHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  // template: `
  //   <div class="logo-header vts-logo" *ngIf="showLogo"></div>
  //   <div class="title-container">
  //     <ng-container *ngIf="title">
  //       {{ title }}
  //     </ng-container>
  //     <ul vts-menu vtsTheme="dark" vtsMode="horizontal" class="header-menu" [vtsTheme]="vtsTheme" *ngIf="!useSplitMenu">
  //       <ng-container *ngFor="let item of menuData">
  //         <vts-prolayout-menu-item-horizontal [menuItem]="item"></vts-prolayout-menu-item-horizontal>
  //       </ng-container>
  //     </ul>
  //   </div>
  // `,
  templateUrl: 'pro-header.component.html',
  styles: [
    `
      .logo-header {
        width: 120px;
        height: 46px;
        margin: 10px 28px 0 24px;
        float: left;
        background-repeat: no-repeat;
        background-size: contain;
      }
    `,
    `
     .title-container {
        display: flex;
        padding-left: 24px;
      }
    `
  ]
})
export class VtsHeaderComponent implements OnChanges {
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-prolayout-header');
  }

  @Input() isFixedHeader: boolean = false;
  @Input() isFixedSider: boolean = false;
  @Input() menuData: MenuItemProLayout[] = [];
  // @Input() vtsTheme: VtsMenuThemeType = 'light';
  @Input() useSplitMenu: boolean = false;
  @Input() title: string | TemplateRef<void> | null = null;

  showLogo: boolean = true;
  avatar: AvatarUser = {
    size: "md",
    name: "Shiba inu",
    subname: "Viettel Solution",
    menu: [
      {
        label: "Quản lý tài khoản",
        url: "/"
      },
      {
        label: "Logout",
        url: ""
      }
    ]
  }
  showMenu: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    const {isFixedHeader, isFixedSider, menuData, title } = changes;
    this.handleChangeFixedStatus(isFixedHeader, isFixedSider);    
    if(menuData){
      if(this.title || (title && title.currentValue)){
        // add a wrapper item to create a menu button
        let newMenuData: MenuItemProLayout[] = [
          {
            icon: "toc",
            title: "",
            children: [
              ...menuData.currentValue
            ]
          }
        ];
        this.menuData = [
          ...newMenuData
        ];
      }
    }
  }

  handleChangeFixedStatus(isFixedHeader: SimpleChange, isFixedSider: SimpleChange){
    if(isFixedHeader && isFixedSider){
      if(isFixedHeader.currentValue && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && isFixedSider.currentValue){
        this.showLogo = false;
      }
    }
    else if(isFixedHeader && !isFixedSider){
      if(isFixedHeader.currentValue && !this.isFixedSider){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && !this.isFixedSider){
        this.showLogo = true;
      }
      else if(!isFixedHeader.currentValue && this.isFixedSider){
        this.showLogo = false;
      }
    }
    else if(!isFixedHeader && isFixedSider){
      if(this.isFixedHeader && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!this.isFixedHeader && !isFixedSider.currentValue){
        this.showLogo = true;
      }
      else if(!this.isFixedHeader && isFixedSider.currentValue){
        this.showLogo = false;
      }
    }
  }

  onOpenMenuAvatar(){
    this.showMenu = !this.showMenu;
  }
}
