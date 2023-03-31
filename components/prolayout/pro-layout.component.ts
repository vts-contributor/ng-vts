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
  OnDestroy
} from '@angular/core';
import { ProlayoutService } from './pro-layout.service';
import { VtsAvatarMenu, VtsAvatarUser, VtsMenuItemProLayout } from './pro-layout.types';
import { VtsBreadcrumbItem } from '@ui-vts/ng-vts/breadcrumb';
import { Subscription } from 'rxjs';

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
        padding: 0 24px;
        min-height: 280px;
      }

      vts-prolayout-footer {
        text-align: center;
      }
    `
  ]
})
export class VtsProLayoutContainerComponent implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef, private prolayoutService: ProlayoutService) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-prolayout-container');
  }
  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  themeColor: string = '#EE0033';

  isFixedHeader: boolean = false;
  isFixedSider: boolean = true;
  isShowHeader: boolean = true;
  isShowSider: boolean = true;
  isShowFooter: boolean = true;
  @Input() vtsMenuHeader: VtsMenuItemProLayout[] = [];
  @Input() vtsMenuSider: VtsMenuItemProLayout[] = [];
  @Input() vtsHeaderTitle: string | TemplateRef<void> | null =
    'GOVERNMENT SOLUTION CENTER PLATFORM';
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

  private fixedHeaderSubscription = Subscription.EMPTY;
  private fixedSiderSubscription = Subscription.EMPTY;
  private visibleHeaderSubscription = Subscription.EMPTY;
  private visisbleSiderSubscription = Subscription.EMPTY;
  private visibleFooterSubscription = Subscription.EMPTY;

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

  ngOnInit(): void {
    // emit changes when receiving menu
    this.prolayoutService.onChangeMenuHeader(this.vtsMenuHeader);
    this.prolayoutService.onChangeMenuSider(this.vtsMenuSider);

    // on change ix fixed
    this.fixedSiderSubscription = this.prolayoutService.fixedSiderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedSider = isFixed;
      }
    );
    this.fixedHeaderSubscription = this.prolayoutService.fixedHeaderChange$.subscribe(
      (isFixed: boolean) => {
        this.isFixedHeader = isFixed;
      }
    );

    // onchange visibility
    this.visibleHeaderSubscription = this.prolayoutService.visibilityHeaderChange$.subscribe(
      (isShow: boolean) => {
        this.onChangeVisiblityHeader(isShow);
      }
    );
    this.visisbleSiderSubscription = this.prolayoutService.visibilitySiderChange$.subscribe(
      (isShow: boolean) => {
        this.onChangeVisiblitySider(isShow);
      }
    );
    this.visibleFooterSubscription = this.prolayoutService.visibilityFooterChange$.subscribe(
      (isShow: boolean) => {
        this.onChangeVisiblityFooter(isShow);
      }
    );
  }

  /**
   * destroy all subscription of prolayout service
   */
  destroySubscriptions() {
    this.fixedHeaderSubscription.unsubscribe();
    this.fixedSiderSubscription.unsubscribe();
    this.visibleFooterSubscription.unsubscribe();
    this.visibleHeaderSubscription.unsubscribe();
    this.visisbleSiderSubscription.unsubscribe();
  }
}
