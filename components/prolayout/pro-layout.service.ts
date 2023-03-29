import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { VtsMenuItemProLayout } from './pro-layout.types';

@Injectable({
  providedIn: 'root'
})
export class ProlayoutService {
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
}
