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
  TemplateRef,
  OnDestroy,
  Inject
} from '@angular/core';
import { VtsProlayoutService } from './pro-layout.service';
import { Router } from "@angular/router";
import { VtsAvatarMenu, VtsAvatarUser, VtsMenuItemProLayout, VtsNotificationConfig } from './pro-layout.types';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { VtsBlockUIService } from './block-ui.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
        margin: 5px 28px 0 24px;
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

      .icons-utils {
        padding-left: 15px;
        padding-right: 15px;
      }

      :host i {
        font-size: x-large;
      }
    `
  ]
})
export class VtsHeaderComponent implements OnChanges, OnInit, OnDestroy {
  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    private prolayoutService: VtsProlayoutService,
    private lockUiService: VtsBlockUIService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private breakpointService: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-prolayout-header');
  }
  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  isFixedHeader: boolean = false;
  isFixedSider: boolean = false;
  menuData: VtsMenuItemProLayout[] = [];
  isCollapsedSider: boolean = false;
  notificationCount: number = 0;
  isFullScreen: boolean = false;
  /**
   * check window size
   */
  windowSize: 'small' | 'medium' | 'large' = 'large';

  private fixedHeaderSubscription = Subscription.EMPTY;
  private fixedSiderSubscription = Subscription.EMPTY;
  private splitMenuSubscription = Subscription.EMPTY;
  private menuHeaderSubscription = Subscription.EMPTY;
  private collapsedSiderSubscription = Subscription.EMPTY;
  private notificationCountSubscription = Subscription.EMPTY;
  private windowSizeSubscription = Subscription.EMPTY;

  // @Input() vtsTheme: VtsMenuThemeType = 'light';
  useSplitMenu: boolean = false;
  @Input() vtsTitle: string | TemplateRef<void> | null = null;

  showLogo: boolean = true;
  @Input() vtsAvatar: VtsAvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution'
  };
  showMenu: boolean = false;
  @Input() vtsAvatarMenu: VtsAvatarMenu[] = [];
  @Input() vtsLogoUrl: string = "";
  @Input() vtsMenuTemplate: TemplateRef<void> | null = null;
  @Input() vtsNotificationConfig: VtsNotificationConfig = {
    type: "menuContext",
    overflowCount: 99
  }
  @Input() vtsVisibleNotifyPane: boolean = false;
  @Input() vtsMenuAvatarTemplateRef: TemplateRef<void> | null = null;

  ngOnInit(): void {
    // receive menus from container
    this.menuHeaderSubscription = this.prolayoutService.menuHeaderChange$.subscribe(
      (data: VtsMenuItemProLayout[]) => {
        this.menuData = data;
        let newMenuData: VtsMenuItemProLayout[] = [
          {
            icon: 'Toc:vts',
            title: '',
            children: [...data]
          }
        ];
        this.menuData = [...newMenuData];
      }
    );

    // on change ix fixed
    this.fixedSiderSubscription = this.prolayoutService.fixedSiderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedSider = isFixed;
        this.handleChangeFixedStatus(this.isFixedHeader, isFixed);
      }
    );
    this.fixedHeaderSubscription = this.prolayoutService.fixedHeaderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedHeader = isFixed;
        this.handleChangeFixedStatus(isFixed, this.isFixedSider);
      }
    );

    // onchange use split menu
    this.splitMenuSubscription = this.prolayoutService.useSplitMenuChange$.subscribe(
      (isMenuSplitted: boolean) => {
        this.useSplitMenu = isMenuSplitted;
        this.cdf.detectChanges();
      }
    );

    // on change collapsed sider
    this.collapsedSiderSubscription = this.prolayoutService.collapSiderChange$.subscribe((isCollapsed: boolean) => {
      this.isCollapsedSider = isCollapsed;
    });

    // on change notification count
    this.notificationCountSubscription = this.prolayoutService.notificationChange$.subscribe((count: number) => {
      this.notificationCount = count;
    });

    // listen for changes in size of current window
    this.windowSizeSubscription = this.breakpointService.observe(
        [Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]
      ).subscribe((result) => {
      const breakpoints = result.breakpoints;
      if(breakpoints[Breakpoints.Small]){
        this.windowSize = 'small';
      }
      else if(breakpoints[Breakpoints.Medium]){
        this.windowSize = 'medium';
      }
      else if(breakpoints[Breakpoints.Large] || breakpoints[Breakpoints.XLarge]){
        this.windowSize = 'large';
      }
      this.cdf.detectChanges();
    })
  }

  /**
   * destroy all subscription of prolayout service
   */
  destroySubscriptions() {
    this.menuHeaderSubscription.unsubscribe();
    this.fixedSiderSubscription.unsubscribe();
    this.fixedHeaderSubscription.unsubscribe();
    this.splitMenuSubscription.unsubscribe();
    this.collapsedSiderSubscription.unsubscribe();
    this.notificationCountSubscription.unsubscribe();
    this.windowSizeSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { title } = changes;
    if (!this.useSplitMenu) {
      if (this.vtsTitle || (title && title.currentValue)) {
        // add a wrapper item to create a menu button
        let newMenuData: VtsMenuItemProLayout[] = [
          {
            icon: 'Toc:vts',
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

  onClickAvatarMenuItem(item: VtsAvatarMenu): void {
    this.router.navigateByUrl(item.url);
  }

  toggleSider() {
    this.prolayoutService.onChangeCollapedSider(!this.isCollapsedSider);
  }

  openNotificationPane(){
    this.prolayoutService.openNotificationPane(this.vtsNotificationConfig.type);
  }

  toggleFullScreen(){    
    if(this.isFullScreen){
      this.document.exitFullscreen();
    }
    else {
      this.document.documentElement.requestFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  lockScreen(){
    this.lockUiService.showInputPassword();
  }

}
