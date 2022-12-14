/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { VtsIsMenuInsideDropDownToken } from './menu.token';
import { VtsSubmenuService } from './submenu.service';

@Directive({
  selector: '[vts-menu-item]',
  exportAs: 'vtsMenuItem',
  host: {
    '[class.vts-dropdown-menu-item]': `isMenuInsideDropDown`,
    '[class.vts-dropdown-menu-item-selected]': `isMenuInsideDropDown && vtsSelected`,
    '[class.vts-dropdown-menu-item-danger]': `isMenuInsideDropDown && vtsDanger`,
    '[class.vts-dropdown-menu-item-disabled]': `isMenuInsideDropDown && vtsDisabled`,
    '[class.vts-menu-item]': `!isMenuInsideDropDown`,
    '[class.vts-menu-item-selected]': `!isMenuInsideDropDown && vtsSelected`,
    '[class.vts-menu-item-danger]': `!isMenuInsideDropDown && vtsDanger`,
    '[class.vts-menu-item-disabled]': `!isMenuInsideDropDown && vtsDisabled`,
    '[style.paddingLeft.px]': `dir === 'rtl' ? null : vtsPaddingLeft || inlinePaddingLeft`,
    '[style.paddingRight.px]': `dir === 'rtl' ? vtsPaddingLeft || inlinePaddingLeft : null`,
    '(click)': 'clickMenuItem($event)'
  }
})
export class VtsMenuItemDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsSelected: BooleanInput;
  static ngAcceptInputType_vtsDanger: BooleanInput;
  static ngAcceptInputType_vtsMatchRouterExact: BooleanInput;
  static ngAcceptInputType_vtsMatchRouter: BooleanInput;

  private destroy$ = new Subject();
  level = this.vtsSubmenuService ? this.vtsSubmenuService.level + 1 : 1;
  selected$ = new Subject<boolean>();
  inlinePaddingLeft: number | null = null;
  dir: Direction = 'ltr';
  @Input() vtsPaddingLeft?: number;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsSelected = false;
  @Input() @InputBoolean() vtsDanger = false;
  @Input() @InputBoolean() vtsMatchRouterExact = false;
  @Input() @InputBoolean() vtsMatchRouter = false;
  @ContentChildren(RouterLink, { descendants: true })
  listOfRouterLink!: QueryList<RouterLink>;
  @ContentChildren(RouterLinkWithHref, { descendants: true })
  listOfRouterLinkWithHref!: QueryList<RouterLinkWithHref>;

  /** clear all item selected status except this */
  clickMenuItem(e: MouseEvent): void {
    if (this.vtsDisabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.vtsMenuService.onDescendantMenuItemClick(this);
      if (this.vtsSubmenuService) {
        /** menu item inside the submenu **/
        this.vtsSubmenuService.onChildMenuItemClick(this);
      } else {
        /** menu item inside the root menu **/
        this.vtsMenuService.onChildMenuItemClick(this);
      }
    }
  }

  setSelectedState(value: boolean): void {
    this.vtsSelected = value;
    this.selected$.next(value);
  }

  private updateRouterActive(): void {
    if (
      !this.listOfRouterLink ||
      !this.listOfRouterLinkWithHref ||
      !this.router ||
      !this.router.navigated ||
      !this.vtsMatchRouter
    ) {
      return;
    }
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.vtsSelected !== hasActiveLinks) {
        this.vtsSelected = hasActiveLinks;
        this.setSelectedState(this.vtsSelected);
        this.cdr.markForCheck();
      }
    });
  }

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router!);
    return (
      (this.routerLink && isActiveCheckFn(this.routerLink)) ||
      (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
      this.listOfRouterLink.some(isActiveCheckFn) ||
      this.listOfRouterLinkWithHref.some(isActiveCheckFn)
    );
  }

  private isLinkActive(router: Router): (link: RouterLink | RouterLinkWithHref) => boolean {
    return (link: RouterLink | RouterLinkWithHref) =>
      router.isActive(link.urlTree, this.vtsMatchRouterExact);
  }

  constructor(
    private vtsMenuService: MenuService,
    private cdr: ChangeDetectorRef,
    @Optional() private vtsSubmenuService: VtsSubmenuService,
    @Inject(VtsIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private directionality: Directionality,
    @Optional() private routerLink?: RouterLink,
    @Optional() private routerLinkWithHref?: RouterLinkWithHref,
    @Optional() private router?: Router
  ) {
    if (router) {
      this.router!.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateRouterActive();
      });
    }
  }

  ngOnInit(): void {
    /** store origin padding in padding */
    combineLatest([this.vtsMenuService.mode$, this.vtsMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngAfterContentInit(): void {
    this.listOfRouterLink.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateRouterActive());
    this.listOfRouterLinkWithHref.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsSelected) {
      this.setSelectedState(this.vtsSelected);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
