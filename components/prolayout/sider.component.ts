/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  VtsBreakpointKey,
  VtsBreakpointService,
  siderResponsiveMap
} from '@ui-vts/ng-vts/core/services';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { inNextTick, InputBoolean, toCssPixel } from '@ui-vts/ng-vts/core/util';
import { VtsMenuDirective } from '@ui-vts/ng-vts/menu';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProlayoutService } from './pro-layout.service';
import { VtsMenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-sider',
  exportAs: 'vtsProlayoutSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vts-prolayout-sider-children">
      <div
        class="logo-sider vts-logo"
        *ngIf="!isFixedHeader && isFixedSider"
        [style.backgroundImage]="'url(' + vtsLogoUrl + ')'"
      ></div>
      <ul vts-menu vtsMode="inline" class="sider-menu">
        <ng-container *ngFor="let item of menuData">
          <vts-prolayout-menu-item [vtsMenuItem]="item"></vts-prolayout-menu-item>
        </ng-container>
      </ul>
    </div>
    <div
      *ngIf="vtsCollapsible && vtsTrigger !== null"
      vts-prolayout-sider-trigger
      [matchBreakPoint]="matchBreakPoint"
      [vtsCollapsedWidth]="vtsCollapsedWidth"
      [vtsCollapsed]="vtsCollapsed"
      [vtsBreakpoint]="vtsBreakpoint"
      [vtsReverseArrow]="vtsReverseArrow"
      [vtsTrigger]="vtsTrigger"
      [vtsZeroTrigger]="vtsZeroTrigger"
      [siderWidth]="widthSetting"
      (click)="setCollapsed(!vtsCollapsed)"
    ></div>
  `,
  host: {
    '[class.vts-prolayout-sider-zero-width]': `vtsCollapsed && vtsCollapsedWidth === 0`,
    '[class.vts-prolayout-sider-collapsed]': `vtsCollapsed`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  },
  styles: [
    `
      .logo-sider {
        width: 120px;
        height: 63px;
        margin: 16px 28px 0 24px;
        float: left;
        background-repeat: no-repeat;
        background-size: contain;
      }
    `
  ]
})
export class VtsSiderComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  static ngAcceptInputType_vtsReverseArrow: BooleanInput;
  static ngAcceptInputType_vtsCollapsible: BooleanInput;
  static ngAcceptInputType_vtsCollapsed: BooleanInput;

  private destroy$ = new Subject();
  @ViewChild(VtsMenuDirective)
  vtsMenuDirective: VtsMenuDirective | null = null;
  @Output() readonly vtsCollapsedChange = new EventEmitter();
  @Input() vtsWidth: string | number = 200;
  vtsTheme: string = 'light';
  @Input() vtsCollapsedWidth = 70;
  @Input() vtsBreakpoint: VtsBreakpointKey | null = null;
  @Input() vtsZeroTrigger: TemplateRef<void> | null = null;
  @Input() vtsTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() @InputBoolean() vtsReverseArrow = false;
  @Input() @InputBoolean() vtsCollapsible = false;
  vtsCollapsed = false;
  @Input() vtsUseDarkMode: boolean = false;
  @Input() vtsLogoUrl: string = '';

  menuHeader: VtsMenuItemProLayout[] = []; // if splitmenu = true -> merge both and display in sider
  menuSider: VtsMenuItemProLayout[] = [];
  menuData: VtsMenuItemProLayout[] = []; // use for displaying
  useSplitMenu: boolean = false;
  isFixedHeader: boolean = false;
  isFixedSider: boolean = false;
  matchBreakPoint = false;
  flexSetting: string | null = null;
  widthSetting: string | null = null;

  private fixedHeaderSubscription = Subscription.EMPTY;
  private fixedSiderSubscription = Subscription.EMPTY;
  private splitMenuSubscription = Subscription.EMPTY;
  private menuHeaderSubscription = Subscription.EMPTY;
  private menuSiderSubscription = Subscription.EMPTY;
  private collapsedSiderSubscription = Subscription.EMPTY;

  updateStyleMap(): void {
    this.widthSetting = this.vtsCollapsed
      ? `${this.vtsCollapsedWidth}px`
      : toCssPixel(this.vtsWidth);
    this.flexSetting = `0 0 ${this.widthSetting}`;
    this.cdr.markForCheck();
  }

  updateMenuInlineCollapsed(): void {
    if (
      this.vtsMenuDirective &&
      this.vtsMenuDirective.vtsMode === 'inline' &&
      this.vtsCollapsedWidth !== 0
    ) {
      this.closeAllSubmenuWhenCollapsed();
      this.vtsMenuDirective.setInlineCollapsed(this.vtsCollapsed);
    }
  }

  setCollapsed(collapsed: boolean): void {
    if (collapsed !== this.vtsCollapsed) {
      this.vtsCollapsed = collapsed;
      this.vtsCollapsedChange.emit(collapsed);
      this.updateMenuInlineCollapsed();
      this.updateStyleMap();
      this.cdr.markForCheck();
    }
  }

  constructor(
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService,
    private elementRef: ElementRef,
    private prolayoutService: ProlayoutService,
    private cdf: ChangeDetectorRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-sider');
  }

  ngOnInit(): void {
    this.updateStyleMap();

    if (this.platform.isBrowser) {
      this.breakpointService
        .subscribe(siderResponsiveMap, true)
        .pipe(takeUntil(this.destroy$))
        .subscribe(map => {
          const breakpoint = this.vtsBreakpoint;
          if (breakpoint) {
            inNextTick().subscribe(() => {
              this.matchBreakPoint = !map[breakpoint];
              this.setCollapsed(this.matchBreakPoint);
              this.cdr.markForCheck();
            });
          }
        });
    }

    // on change ix fixed
    this.fixedSiderSubscription = this.prolayoutService.fixedSiderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedSider = isFixed;
      }
    );
    this.fixedHeaderSubscription = this.prolayoutService.fixedHeaderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedHeader = isFixed;
        if (this.vtsCollapsed) {
          this.vtsCollapsed = false;
          this.updateMenuInlineCollapsed();
          this.updateStyleMap();
        }
      }
    );

    // receive menus from container
    this.menuHeaderSubscription = this.prolayoutService.menuHeaderChange$.subscribe(
      (data: VtsMenuItemProLayout[]) => {
        this.menuHeader = data;
        this.handleChangesMenuLogic(this.useSplitMenu, data, this.menuSider);
      }
    );
    this.menuSiderSubscription = this.prolayoutService.menuSiderChange$.subscribe(
      (data: VtsMenuItemProLayout[]) => {
        this.menuSider = data;
        this.handleChangesMenuLogic(this.useSplitMenu, this.menuHeader, data);
      }
    );

    // onchange use split menu
    this.splitMenuSubscription = this.prolayoutService.useSplitMenuChange$.subscribe(
      (isMenuSplitted: boolean) => {
        this.useSplitMenu = isMenuSplitted;
        this.handleChangesMenuLogic(isMenuSplitted, this.menuHeader, this.menuSider);
      }
    );

    // on change collapsed sider
    this.collapsedSiderSubscription = this.prolayoutService.collapSiderChange$.subscribe(
      (isCollapsed: boolean) => {
        if (!this.isFixedSider) {
          this.vtsCollapsed = isCollapsed;
          this.updateMenuInlineCollapsed();
          this.updateStyleMap();
        }
      }
    );
  }

  handleChangesMenuLogic(
    isSplitted: boolean,
    menuHeader: VtsMenuItemProLayout[],
    menuSider: VtsMenuItemProLayout[]
  ): void {
    if (isSplitted) {
      this.menuData = [...menuHeader, ...menuSider];
    } else {
      this.menuData = [...menuSider];
    }
    this.cdf.detectChanges();
  }

  closeSubmenu(submenu: VtsMenuItemProLayout) {
    submenu.isOpen = false;
    if (submenu.children && submenu.children.length > 0) {
      submenu.children.forEach(m => {
        this.closeSubmenu(m);
      });
    }
  }

  closeAllSubmenuWhenCollapsed(): void {
    const newMeudata: VtsMenuItemProLayout[] = JSON.parse(JSON.stringify(this.menuData));
    newMeudata.forEach(menu => {
      this.closeSubmenu(menu);
    });

    this.menuData = [...newMeudata];
  }

  /**
   * destroy all subscription of prolayout service
   */
  destroySubscriptions() {
    this.fixedSiderSubscription.unsubscribe();
    this.fixedHeaderSubscription.unsubscribe();
    this.menuHeaderSubscription.unsubscribe();
    this.menuSiderSubscription.unsubscribe();
    this.splitMenuSubscription.unsubscribe();
    this.collapsedSiderSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsCollapsed, vtsCollapsedWidth, vtsWidth, vtsTheme } = changes;
    if (vtsCollapsed || vtsCollapsedWidth || vtsWidth) {
      this.updateStyleMap();
    }
    if (vtsCollapsed) {
      this.updateMenuInlineCollapsed();
    }
    if (vtsTheme) {
      console.log('theme changed: ', vtsTheme);
    }
  }

  ngAfterContentInit(): void {
    this.updateMenuInlineCollapsed();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroySubscriptions();
  }
}
