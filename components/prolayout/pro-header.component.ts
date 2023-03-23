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
  // SimpleChange,
  ChangeDetectorRef,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
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
export class VtsHeaderComponent implements OnChanges, OnInit {
  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private prolayoutService: ProlayoutService,
    private cdf: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-prolayout-header');
  }

  isFixedHeader: boolean = false;
  isFixedSider: boolean = false;
  menuData: MenuItemProLayout[] = [];
  // @Input() vtsTheme: VtsMenuThemeType = 'light';
  useSplitMenu: boolean = false;
  @Input() title: string | TemplateRef<void> | null = null;

  showLogo: boolean = true;
  avatar: AvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution',
    menu: [
      {
        label: 'Quản lý tài khoản',
        url: '/'
      },
      {
        label: 'Logout',
        url: ''
      }
    ]
  };
  showMenu: boolean = false;

  ngOnInit(): void {
    // receive menus from container
    this.prolayoutService.menuHeaderChange$.subscribe((data: MenuItemProLayout[]) => {
      this.menuData = data;
      let newMenuData: MenuItemProLayout[] = [
        {
          icon: 'toc',
          title: '',
          children: [...data]
        }
      ];
      this.menuData = [...newMenuData];
    });

    // on change ix fixed
    this.prolayoutService.fixedSiderChange$.subscribe((isFixed: boolean) => {
      this.isFixedSider = isFixed;
      this.handleChangeFixedStatus(this.isFixedHeader, isFixed);
    });
    this.prolayoutService.fixedHeaderChange$.subscribe((isFixed: boolean) => {
      this.isFixedHeader = isFixed;
      this.handleChangeFixedStatus(isFixed, this.isFixedSider);
    });

    // onchange use split menu
    this.prolayoutService.useSplitMenuChange$.subscribe((isMenuSplitted: boolean) => {
      this.useSplitMenu = isMenuSplitted;
      this.cdf.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { title } = changes;
    if(!this.useSplitMenu){
      if (this.title || (title && title.currentValue)) {
        // add a wrapper item to create a menu button
        let newMenuData: MenuItemProLayout[] = [
          {
            icon: 'toc',
            title: '',
            children: [...this.menuData]
          }
        ];
        this.menuData = [...newMenuData];
      }
    }
  }

  handleChangeFixedStatus(isFixedHeader: boolean, isFixedSider: boolean) {
    if (isFixedHeader && !isFixedSider) {
      this.showLogo = true;
    } else if (!isFixedHeader && !isFixedSider) {
      this.showLogo = true;
    } else if (!isFixedHeader && isFixedSider) {
      this.showLogo = false;
    }
    if (isFixedHeader && !isFixedSider) {
      if (isFixedHeader && !this.isFixedSider) {
        this.showLogo = true;
      } else if (!isFixedHeader && !this.isFixedSider) {
        this.showLogo = true;
      } else if (!isFixedHeader && this.isFixedSider) {
        this.showLogo = false;
      }
    } else if (!isFixedHeader && isFixedSider) {
      if (this.isFixedHeader && !isFixedSider) {
        this.showLogo = true;
      } else if (!this.isFixedHeader && !isFixedSider) {
        this.showLogo = true;
      } else if (!this.isFixedHeader && isFixedSider) {
        this.showLogo = false;
      }
    }
  }

  onOpenMenuAvatar() {
    this.showMenu = !this.showMenu;
  }
}
