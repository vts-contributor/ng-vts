/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Component,
  ElementRef,
  OnInit,
  Input,
  ViewEncapsulation,
  TemplateRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { VtsProlayoutService } from './pro-layout.service';
import { VtsBlockUIService } from './block-ui.service';
import {
  VtsNotificationConfig,
  VtsAvatarMenu,
  VtsAvatarUser,
  VtsMenuItemProLayout,
  VtsBlockUIConfig,
  VtsVisibilityConfig
} from './pro-layout.types';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-prolayout-container',
  exportAs: 'vtsProLayoutContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: 'pro-layout.component.html',
  styles: [
    `
      .vts-breadcrumb {
        margin-bottom: 24px;
      }

      .inner-layout {
        background: #fff;
      }

      .sider-menu {
        height: 100%;
      }

      .inner-content {
        min-height: 280px;
      }

      vts-prolayout-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsProLayoutContainerComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private elementRef: ElementRef,
    private prolayoutService: VtsProlayoutService,
    private lockUiService: VtsBlockUIService
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-container');
  }
  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  themeColor: string = '#EE0033';

  isFixedHeader: boolean = false;
  isFixedSider: boolean = false;
  isShowHeader: boolean = true;
  isShowSider: boolean = true;
  isShowFooter: boolean = true;
  @Input() vtsMenuHeader: VtsMenuItemProLayout[] = [];
  @Input() vtsMenuSider: VtsMenuItemProLayout[] = [];
  @Input() vtsHeaderTitle: string | TemplateRef<void> | null = 'GOVERMENT SOLUTION CENTER PLATFORM';
  @Input() vtsAvatar: VtsAvatarUser = {
    size: 'md',
    name: 'Shiba inu',
    subname: 'Viettel Solution'
  };
  @Input() vtsAvatarMenu: VtsAvatarMenu[] = [];
  @Input() vtsLogoUrl: string = '';
  @Input() vtsBreadcrumbArray: VtsBreadcrumbItem[] = [];
  @Input() vtsSeparator: string | TemplateRef<void> | null = '❯';
  @Input() vtsFooterTemplate: TemplateRef<void> | null = null;
  @Input() vtsNotificationConfig: VtsNotificationConfig = {
    type: 'menuContext',
    overflowCount: 99
  };
  @Input() vtsVisibleNotifyPane: boolean = false;
  @Input() vtsMenuTemplate: TemplateRef<void> | null = null;
  @Input() vtsBlockUIConfig: VtsBlockUIConfig = {
    isEnabled: true,
    modalLockTitle: 'Khóa màn hình',
    modalUnlockTitle: 'Mở khóa màn hình',
    cancelText: 'Hủy',
    locktext: 'Khóa',
    unlockText: 'Mở khóa'
  };
  @Input() vtsMenuAvatarTemplateRef: TemplateRef<void> | null = null;
  @Input() vtsVisibilityConfig: VtsVisibilityConfig = {
    searchIcon: false,
    fullScreen: true,
    lockScreen: false,
    notifyIcon: true
  };

  private onDestroy$ = new Subject();
  isScreenLocked: boolean = false;

  onChangeVisiblityHeader(value: boolean) {
    this.isShowHeader = value;
    if (!value && this.isFixedHeader) {
      this.isFixedHeader = false;
    }
  }

  onChangeVisiblitySider(value: boolean) {
    this.isShowSider = value;
    if (!value && this.isFixedSider) {
      this.isFixedSider = false;
    }
  }

  onChangeVisiblityFooter(value: boolean) {
    this.isShowFooter = value;
  }

  onChangeThemeColor(color: string) {
    this.themeColor = color;
  }

  onSelectMenuSiderItem(selected: VtsMenuItemProLayout) {
    let menuSider = [...this.vtsMenuSider];
    menuSider.forEach(item => {
      if (item.isSelected) {
        item.isSelected = false;
      }
    });
    menuSider.forEach(item => {
      if (item.id == selected.id) {
        item.isSelected = true;
      }
    });
    this.vtsMenuSider = [...menuSider];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsMenuHeader, vtsMenuSider } = changes;
    if (vtsMenuHeader) {
      this.prolayoutService.onChangeMenuHeader(this.vtsMenuHeader);
    }
    if (vtsMenuSider) {
      this.prolayoutService.onChangeMenuSider(this.vtsMenuSider);
    }
  }

  ngOnInit(): void {
    // emit changes when receiving menu
    this.prolayoutService.onChangeMenuHeader(this.vtsMenuHeader);
    this.prolayoutService.onChangeMenuSider(this.vtsMenuSider);

    // on change ix fixed
    this.prolayoutService.fixedSiderChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isFixed: boolean) => {
        this.isFixedSider = isFixed;
      });
    this.prolayoutService.fixedHeaderChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isFixed: boolean) => {
        this.isFixedHeader = isFixed;
      });

    // onchange visibility
    this.prolayoutService.visibilityHeaderChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isShow: boolean) => {
        this.onChangeVisiblityHeader(isShow);
      });
    this.prolayoutService.visibilitySiderChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isShow: boolean) => {
        this.onChangeVisiblitySider(isShow);
      });
    this.prolayoutService.visibilityFooterChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isShow: boolean) => {
        this.onChangeVisiblityFooter(isShow);
      });

    // show/hide lock screen
    this.lockUiService.lockUIStateChange$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((isShow: boolean) => {
        this.isScreenLocked = isShow;
      });
    this.lockUiService.getLockState();
  }

  /**
   * destroy all subscription of prolayout service
   */
  destroySubscriptions() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
