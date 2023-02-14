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
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  SkipSelf
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { VtsIsMenuInsideDropDownToken, VtsMenuServiceLocalToken } from './menu.token';
import { VtsMenuModeType } from './menu.types';
import { VtsSubMenuComponent } from './submenu.component';

export function MenuServiceFactory(
  serviceInsideDropDown: MenuService,
  serviceOutsideDropDown: MenuService
): MenuService {
  return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
export function MenuDropDownTokenFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}

@Directive({
  selector: '[vts-menu]',
  exportAs: 'vtsMenu',
  providers: [
    {
      provide: VtsMenuServiceLocalToken,
      useClass: MenuService
    },
    /** use the top level service **/
    {
      provide: MenuService,
      useFactory: MenuServiceFactory,
      deps: [[new SkipSelf(), new Optional(), MenuService], VtsMenuServiceLocalToken]
    },
    /** check if menu inside dropdown-menu component **/
    {
      provide: VtsIsMenuInsideDropDownToken,
      useFactory: MenuDropDownTokenFactory,
      deps: [[new SkipSelf(), new Optional(), VtsIsMenuInsideDropDownToken]]
    }
  ],
  host: {
    '[class.vts-dropdown-menu]': `isMenuInsideDropDown`,
    '[class.vts-dropdown-menu-root]': `isMenuInsideDropDown`,
    '[class.vts-dropdown-menu-vertical]': `isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.vts-dropdown-menu-horizontal]': `isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.vts-dropdown-menu-inline]': `isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.vts-dropdown-menu-inline-collapsed]': `isMenuInsideDropDown && vtsInlineCollapsed`,
    '[class.vts-menu]': `!isMenuInsideDropDown`,
    '[class.vts-menu-root]': `!isMenuInsideDropDown`,
    '[class.vts-menu-vertical]': `!isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.vts-menu-horizontal]': `!isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.vts-menu-inline]': `!isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.vts-menu-inline-collapsed]': `!isMenuInsideDropDown && vtsInlineCollapsed`,
    '[class.vts-menu-rtl]': `dir === 'rtl'`
  }
})
export class VtsMenuDirective implements AfterContentInit, OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_vtsInlineCollapsed: BooleanInput;
  static ngAcceptInputType_vtsSelectable: BooleanInput;

  @ContentChildren(VtsMenuItemDirective, { descendants: true })
  listOfVtsMenuItemDirective!: QueryList<VtsMenuItemDirective>;
  @ContentChildren(VtsSubMenuComponent, { descendants: true })
  listOfVtsSubMenuComponent!: QueryList<VtsSubMenuComponent>;
  @Input() vtsMode: VtsMenuModeType = 'vertical';
  @Input() @InputBoolean() vtsInlineCollapsed = false;
  @Input() @InputBoolean() vtsSelectable = !this.isMenuInsideDropDown;
  @Output() readonly vtsClick = new EventEmitter<VtsMenuItemDirective>();
  actualMode: VtsMenuModeType = 'vertical';
  dir: Direction = 'ltr';
  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.vtsInlineCollapsed);
  private mode$ = new BehaviorSubject<VtsMenuModeType>(this.vtsMode);
  private destroy$ = new Subject();
  private listOfOpenedVtsSubMenuComponent: VtsSubMenuComponent[] = [];

  setInlineCollapsed(inlineCollapsed: boolean): void {
    this.vtsInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }

  updateInlineCollapse(): void {
    if (this.listOfVtsMenuItemDirective) {
      if (this.vtsInlineCollapsed) {
        this.listOfOpenedVtsSubMenuComponent = this.listOfVtsSubMenuComponent.filter(
          submenu => submenu.vtsOpen
        );
        this.listOfVtsSubMenuComponent.forEach(submenu =>
          submenu.setOpenStateWithoutDebounce(false)
        );
      } else {
        this.listOfOpenedVtsSubMenuComponent.forEach(submenu =>
          submenu.setOpenStateWithoutDebounce(true)
        );
        this.listOfOpenedVtsSubMenuComponent = [];
      }
    }
  }

  constructor(
    private vtsMenuService: MenuService,
    @Inject(VtsIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    combineLatest([this.inlineCollapsed$, this.mode$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([inlineCollapsed, mode]) => {
        this.actualMode = inlineCollapsed ? 'vertical' : mode;
        this.vtsMenuService.setMode(this.actualMode);
        this.cdr.markForCheck();
      });
    this.vtsMenuService.descendantMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
      this.vtsClick.emit(menu);
      if (this.vtsSelectable && !menu.vtsMatchRouter) {
        this.listOfVtsMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.vtsMenuService.setMode(this.actualMode);
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.inlineCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateInlineCollapse();
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsInlineCollapsed, vtsMode } = changes;
    if (vtsInlineCollapsed) {
      this.inlineCollapsed$.next(this.vtsInlineCollapsed);
    }
    if (vtsMode) {
      this.mode$.next(this.vtsMode);
      if (!changes.vtsMode.isFirstChange() && this.listOfVtsSubMenuComponent) {
        this.listOfVtsSubMenuComponent.forEach(submenu =>
          submenu.setOpenStateWithoutDebounce(false)
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
