/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { getPlacementName, POSITION_MAP } from '@ui-vts/ng-vts/core/overlay';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { VtsMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { VtsIsMenuInsideDropDownToken } from './menu.token';
import { VtsMenuModeType } from './menu.types';
import { VtsSubmenuService } from './submenu.service';

const listOfVerticalPositions = [
  POSITION_MAP.rightTop,
  POSITION_MAP.right,
  POSITION_MAP.rightBottom,
  POSITION_MAP.leftTop,
  POSITION_MAP.left,
  POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [POSITION_MAP.bottomLeft];

@Component({
  selector: '[vts-submenu]',
  exportAs: 'vtsSubmenu',
  providers: [VtsSubmenuService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div
      vts-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [vtsIcon]="vtsIcon"
      [vtsTitle]="vtsTitle"
      [mode]="mode"
      [vtsDisabled]="vtsDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!vtsTitle"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      vts-submenu-inline-child
      [mode]="mode"
      [vtsOpen]="vtsOpen"
      [@.disabled]="noAnimation?.vtsNoAnimation"
      [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
      [menuClass]="vtsMenuClassName"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayOpen]="vtsOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.vts-menu-submenu'"
      >
        <div
          vts-submenu-none-inline-child
          [level]="level"
          [isFirst]="isFirst$ | async"
          [isLasted]="isLasted$ | async"
          [mode]="mode"
          [rootMode]="rootMode$ | async"
          [vtsOpen]="vtsOpen"
          [position]="position"
          [vtsDisabled]="vtsDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          [menuClass]="vtsMenuClassName"
          [@.disabled]="noAnimation?.vtsNoAnimation"
          [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>

    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.vts-dropdown-menu-submenu]': `isMenuInsideDropDown`,
    '[class.vts-dropdown-menu-submenu-disabled]': `isMenuInsideDropDown && vtsDisabled`,
    '[class.vts-dropdown-menu-submenu-open]': `isMenuInsideDropDown && vtsOpen`,
    '[class.vts-dropdown-menu-submenu-selected]': `isMenuInsideDropDown && isSelected`,
    '[class.vts-dropdown-menu-submenu-vertical]': `isMenuInsideDropDown && mode === 'vertical'`,
    '[class.vts-dropdown-menu-submenu-horizontal]': `isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.vts-dropdown-menu-submenu-inline]': `isMenuInsideDropDown && mode === 'inline'`,
    '[class.vts-dropdown-menu-submenu-active]': `isMenuInsideDropDown && isActive`,
    '[class.vts-menu-submenu]': `!isMenuInsideDropDown`,
    '[class.vts-menu-submenu-disabled]': `!isMenuInsideDropDown && vtsDisabled`,
    '[class.vts-menu-submenu-open]': `!isMenuInsideDropDown && vtsOpen`,
    '[class.vts-menu-submenu-selected]': `!isMenuInsideDropDown && isSelected`,
    '[class.vts-menu-submenu-vertical]': `!isMenuInsideDropDown && mode === 'vertical'`,
    '[class.vts-menu-submenu-horizontal]': `!isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.vts-menu-submenu-inline]': `!isMenuInsideDropDown && mode === 'inline'`,
    '[class.vts-menu-submenu-active]': `!isMenuInsideDropDown && isActive`,
    '[class.vts-menu-submenu-rtl]': `dir === 'rtl'`,
    '[attr.level]': 'level'
  }
})
export class VtsSubMenuComponent implements OnInit, OnDestroy, AfterContentInit, OnChanges {
  static ngAcceptInputType_vtsOpen: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsMenuClassName: string = '';
  @Input() vtsTitle: string | TemplateRef<void> | null = null;
  @Input() vtsIcon: string | null = null;
  @Input() @InputBoolean() vtsOpen = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Output() readonly vtsOpenChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef })
  cdkOverlayOrigin: ElementRef | null = null;
  @ContentChildren(VtsSubMenuComponent, { descendants: true })
  listOfVtsSubMenuComponent: QueryList<VtsSubMenuComponent> | null = null;
  @ContentChildren(VtsMenuItemDirective, { descendants: true })
  listOfVtsMenuItemDirective: QueryList<VtsMenuItemDirective> | null = null;
  level = this.vtsSubmenuService.level;
  isFirst$ = this.vtsSubmenuService.isFirst$;
  isLasted$ = this.vtsSubmenuService.isLasted$;
  rootMode$ = this.vtsSubmenuService.rootMode$;
  private destroy$ = new Subject<void>();
  position = 'right';
  triggerWidth: number | null = null;
  mode: VtsMenuModeType = 'vertical';
  overlayPositions = listOfVerticalPositions;
  isSelected = false;
  isActive = false;
  dir: Direction = 'ltr';

  /** set the submenu host open status directly **/
  setOpenStateWithoutDebounce(open: boolean): void {
    this.vtsSubmenuService.setOpenStateWithoutDebounce(open);
  }

  toggleSubMenu(): void {
    this.setOpenStateWithoutDebounce(!this.vtsOpen);
  }

  setMouseEnterState(value: boolean): void {
    this.isActive = value;
    if (this.mode !== 'inline') {
      this.vtsSubmenuService.setMouseEnterTitleOrOverlayState(value);
    }
  }

  setTriggerWidth(): void {
    if (this.mode === 'horizontal' && this.platform.isBrowser && this.cdkOverlayOrigin) {
      /** TODO: fast dom **/
      this.triggerWidth = this.cdkOverlayOrigin!.nativeElement.getBoundingClientRect().width;
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    const placement = getPlacementName(position);
    if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
      this.position = 'right';
    } else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
      this.position = 'left';
    }
    this.cdr.markForCheck();
  }

  constructor(
    public vtsMenuService: MenuService,
    private cdr: ChangeDetectorRef,
    public vtsSubmenuService: VtsSubmenuService,
    private platform: Platform,
    @Inject(VtsIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {}

  ngOnInit(): void {
    /** submenu mode update **/
    this.vtsSubmenuService.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.mode = mode;
      if (mode === 'horizontal') {
        this.overlayPositions = listOfHorizontalPositions;
      } else if (mode === 'vertical') {
        this.overlayPositions = listOfVerticalPositions;
      }
      this.cdr.markForCheck();
    });
    /** current submenu open status **/
    this.vtsSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntil(this.destroy$)).subscribe(open => {
      this.isActive = open;
      if (open !== this.vtsOpen) {
        this.setTriggerWidth();
        this.vtsOpen = open;
        this.vtsOpenChange.emit(this.vtsOpen);
        this.cdr.markForCheck();
      }
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.markForCheck();
    });
  }

  ngAfterContentInit(): void {
    this.setTriggerWidth();
    const listOfVtsMenuItemDirective = this.listOfVtsMenuItemDirective;
    const changes = listOfVtsMenuItemDirective!.changes;
    const mergedObservable = merge(
      ...[changes, ...listOfVtsMenuItemDirective!.map(menu => menu.selected$)]
    );
    changes
      .pipe(
        startWith(listOfVtsMenuItemDirective),
        switchMap(() => mergedObservable),
        startWith(true),
        map(() => listOfVtsMenuItemDirective!.some(e => e.vtsSelected)),
        takeUntil(this.destroy$)
      )
      .subscribe(selected => {
        this.isSelected = selected;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsOpen } = changes;
    if (vtsOpen) {
      this.vtsSubmenuService.setOpenStateWithoutDebounce(this.vtsOpen);
      this.setTriggerWidth();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
