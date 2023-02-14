/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Inject, Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import {
  auditTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  mapTo,
  mergeMap,
  takeUntil
} from 'rxjs/operators';
import { MenuService } from './menu.service';
import { VtsIsMenuInsideDropDownToken } from './menu.token';
import { VtsMenuModeType } from './menu.types';

@Injectable()
export class VtsSubmenuService implements OnDestroy {
  mode$: Observable<VtsMenuModeType> = this.vtsMenuService.mode$.pipe(
    map(mode => {
      if (mode === 'inline') {
        return 'inline';
        /** if inside another submenu, set the mode to vertical **/
      } else if (mode === 'vertical' || this.vtsHostSubmenuService) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    })
  );
  rootMode$: Observable<VtsMenuModeType> = this.vtsMenuService.mode$.pipe(
    switchMap(mode => {
      if (this.vtsHostSubmenuService) return this.vtsHostSubmenuService.rootMode$;
      return of(mode);
    })
  );
  level = 1;
  isFirst$ = new BehaviorSubject<boolean>(true);
  isLasted$ = new BehaviorSubject<boolean>(true);
  isInsidePopup: boolean = false;
  isCurrentSubMenuOpen$ = new BehaviorSubject<boolean>(false);
  private isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);
  /** submenu title & overlay mouse enter status **/
  private isMouseEnterTitleOrOverlay$ = new Subject<boolean>();
  private childMenuItemClick$ = new Subject<VtsSafeAny>();
  private destroy$ = new Subject<void>();
  /**
   * menu item inside submenu clicked
   * @param menu
   */
  onChildMenuItemClick(menu: VtsSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }
  setOpenStateRecursive(): void {
    if (this.vtsHostSubmenuService) {
      this.vtsHostSubmenuService.setOpenStateRecursive();
    }
    this.setOpenStateWithoutDebounce(true);
  }
  setOpenStateWithoutDebounce(value: boolean): void {
    this.isCurrentSubMenuOpen$.next(value);
  }
  setMouseEnterTitleOrOverlayState(value: boolean): void {
    this.isMouseEnterTitleOrOverlay$.next(value);
  }

  trackOrder() {
    if (this.vtsHostSubmenuService) {
      this.vtsHostSubmenuService.isLasted$.next(false);
      this.isFirst$.next(false);
    }
    if (this.level === 1) this.isFirst$.next(true);
  }

  constructor(
    @SkipSelf() @Optional() private vtsHostSubmenuService: VtsSubmenuService,
    public vtsMenuService: MenuService,
    @Inject(VtsIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean
  ) {
    if (this.vtsHostSubmenuService) {
      this.level = this.vtsHostSubmenuService.level + 1;
      this.isInsidePopup = true;
      this.trackOrder();
    }
    /** close if menu item clicked **/
    const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(
      mergeMap(() => this.mode$),
      filter(mode => mode !== 'inline' || this.isMenuInsideDropDown),
      mapTo(false)
    );
    const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
    /** combine the child submenu status with current submenu status to calculate host submenu open **/
    const isSubMenuOpenWithDebounce$ = combineLatest([
      this.isChildSubMenuOpen$,
      isCurrentSubmenuOpen$
    ]).pipe(
      map(
        ([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen
      ),
      auditTime(150),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );
    isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged()).subscribe(data => {
      this.setOpenStateWithoutDebounce(data);
      if (this.vtsHostSubmenuService) {
        /** set parent submenu's child submenu open status **/
        this.vtsHostSubmenuService.isChildSubMenuOpen$.next(data);
      } else {
        this.vtsMenuService.isChildSubMenuOpen$.next(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
