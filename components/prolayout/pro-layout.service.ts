import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { VtsDrawerRef } from '@ui-vts/ng-vts/drawer';
import { VtsMenuItemProLayout, VtsNotiPaneType } from './pro-layout.types';

@Injectable({
  providedIn: 'root'
})
export class VtsProlayoutService {
  fixedSiderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  fixedHeaderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  visibilitySiderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  visibilityHeaderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  visibilityFooterChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  useSplitMenuChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  menuHeaderChange$: ReplaySubject<VtsMenuItemProLayout[]> = new ReplaySubject<
    VtsMenuItemProLayout[]
  >(1);
  menuSiderChange$: ReplaySubject<VtsMenuItemProLayout[]> = new ReplaySubject<
    VtsMenuItemProLayout[]
  >(1);
  collapSiderChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  notificationChange$: ReplaySubject<number> = new ReplaySubject<number>(1);
  // notification pane visibility
  visiblePaneChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  settingDrawerStateChange$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  drawerNotifyRef: VtsDrawerRef | null = null;

  onChangeFixedSider(isFixed: boolean): void {
    this.fixedSiderChange$.next(isFixed);
  }

  onChangeFixedHeader(isFixed: boolean): void {
    this.fixedHeaderChange$.next(isFixed);
  }

  onChangeVisibilitySider(isShow: boolean): void {
    this.visibilitySiderChange$.next(isShow);
  }

  onChangeVisibilityHeader(isShow: boolean): void {
    this.visibilityHeaderChange$.next(isShow);
  }

  onChangeVisibilityFooter(isShow: boolean): void {
    this.visibilityFooterChange$.next(isShow);
  }

  onChangeUseSplitMenu(isMenuSplitted: boolean): void {
    this.useSplitMenuChange$.next(isMenuSplitted);
  }

  onChangeMenuHeader(data: VtsMenuItemProLayout[]): void {
    this.menuHeaderChange$.next(data);
  }

  onChangeMenuSider(data: VtsMenuItemProLayout[]): void {
    this.menuSiderChange$.next(data);
  }

  onChangeCollapedSider(isCollapsed: boolean): void {
    this.collapSiderChange$.next(isCollapsed);
  }

  onChangeNotification(count: number): void {
    this.notificationChange$.next(count);
  }

  getDrawerNotifyRef(): VtsDrawerRef | null {
    return this.drawerNotifyRef;
  }

  openNotificationPane(paneType: VtsNotiPaneType): void {
    if (paneType === 'drawer') {
      this.visiblePaneChange$.next(true);
    }
  }

  onChangeSettingDrawerState(visible: boolean) {
    this.settingDrawerStateChange$.next(visible);
  }
}
