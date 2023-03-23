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
  ChangeDetectorRef,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
import { Router } from "@angular/router";
import { AvatarMenu, AvatarUser, MenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-header',
  exportAs: 'vtsProLayoutHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
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
    private cdf: ChangeDetectorRef,
    private router: Router
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
  @Input() avatar: AvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution'
  };
  showMenu: boolean = false;
  @Input() avatarMenu: AvatarMenu[] = [];

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

  onClickAvatarMenuItem(item: AvatarMenu): void {
    this.router.navigateByUrl(item.url);
  }

}
