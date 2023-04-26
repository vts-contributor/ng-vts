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
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { VtsBlockUIService } from './block-ui.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-prolayout-header',
  exportAs: 'vtsProLayoutHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: 'pro-header.component.html'
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
  isCollapsedSider: boolean = false;
  notificationCount: number = 0;
  isFullScreen: boolean = false;
  isShowSider: boolean = true;
  /**
   * check window size
   */
  windowSize: 'small' | 'medium' | 'large' = 'large';

  private onDestroy$ = new Subject();

  // @Input() vtsTheme: VtsMenuThemeType = 'light';
  useSplitMenu: boolean = true;
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
  /**
   * input from parent; actual data will be wrapped by one item with Toc:vts icon
   */
  @Input() vtsMenuData: VtsMenuItemProLayout[] = [];
  displayMenuData: VtsMenuItemProLayout[] = [];

  ngOnInit(): void {
    // receive menus from container
    this.prolayoutService.menuHeaderChange$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (data: VtsMenuItemProLayout[]) => {
        this.vtsMenuData = data;
        let newMenuData: VtsMenuItemProLayout[] = [
          {
            icon: 'Toc:vts',
            title: '',
            children: [...data]
          }
        ];
        this.displayMenuData = [...newMenuData];
      }
    );

    // on change ix fixed
    this.prolayoutService.fixedSiderChange$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (isFixed: boolean) => {
        this.isFixedSider = isFixed;
        this.handleChangeFixedStatus(this.isFixedHeader, isFixed);
      }
    );
    this.prolayoutService.fixedHeaderChange$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (isFixed: boolean) => {
        this.isFixedHeader = isFixed;
        this.handleChangeFixedStatus(isFixed, this.isFixedSider);
        this.cdf.detectChanges();
      }
    );

    // onchange use split menu
    this.prolayoutService.useSplitMenuChange$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (isMenuSplitted: boolean) => {
        this.useSplitMenu = isMenuSplitted;
        if(!isMenuSplitted){
          if (this.vtsTitle) {
            // add a wrapper item to create a menu button
            let newMenuData: VtsMenuItemProLayout[] = [
              {
                icon: 'Toc:vts',
                title: '',
                children: [...this.vtsMenuData]
              }
            ];
            this.displayMenuData = [...newMenuData];
          }
        }
        this.cdf.detectChanges();
      }
    );

    // on change collapsed sider
    this.prolayoutService.collapSiderChange$.pipe(takeUntil(this.onDestroy$)).subscribe((isCollapsed: boolean) => {
      this.isCollapsedSider = isCollapsed;
    });

    // on change notification count
    this.prolayoutService.notificationChange$.pipe(takeUntil(this.onDestroy$)).subscribe((count: number) => {
      this.notificationCount = count;
    });

    // on change show sider
    this.prolayoutService.visibilitySiderChange$.pipe(takeUntil(this.onDestroy$)).subscribe(
      (isShow: boolean) => {
        this.isShowSider = isShow;
        this.cdf.detectChanges();
      }
    );

    // listen for changes in size of current window
    this.breakpointService.observe(
        [Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]
      ).pipe(takeUntil(this.onDestroy$)).subscribe((result) => {
      const breakpoints = result.breakpoints;
      if(breakpoints[Breakpoints.Small]){
        this.windowSize = 'small';
        this.isCollapsedSider = true;
      }
      else if(breakpoints[Breakpoints.Medium]){
        this.windowSize = 'medium';
        this.isCollapsedSider = true;
      }
      else if(breakpoints[Breakpoints.Large] || breakpoints[Breakpoints.XLarge]){
        this.windowSize = 'large';
        this.isCollapsedSider = false;
      }
      this.prolayoutService.onChangeCollapedSider(this.isCollapsedSider);
      this.cdf.detectChanges();
    })
  }

  /**
   * destroy all subscription of prolayout service
   */
  destroySubscriptions() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
            children: [...this.vtsMenuData]
          }
        ];
        this.displayMenuData = [...newMenuData];
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
