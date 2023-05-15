/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceNumberProperty } from '@angular/cdk/coercion';
/** get some code from https://github.com/angular/material2 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';

import { merge, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, filter, first, startWith, takeUntil } from 'rxjs/operators';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { PREFIX } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, NumberInput, VtsSafeAny, VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, wrapIntoObservable } from '@ui-vts/ng-vts/core/util';

import {
  VtsAnimatedInterface,
  VtsTabChangeEvent,
  VtsTabPosition,
  VtsTabPositionMode,
  VtsTabsCanDeactivateFn,
  VtsTabScrollEvent,
  VtsTabType
} from './interfaces';
import { VtsTabNavBarComponent } from './tab-nav-bar.component';
import { VtsTabComponent, VTS_TAB_SET } from './tab.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'tabs';

let nextId = 0;

@Component({
  selector: 'vts-tabset',
  exportAs: 'vtsTabset',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: VTS_TAB_SET,
      useExisting: VtsTabSetComponent
    }
  ],
  template: `
    <vts-tabs-nav
      *ngIf="tabs.length"
      [ngStyle]="vtsTabBarStyle"
      [selectedIndex]="vtsSelectedIndex || 0"
      [inkBarAnimated]="inkBarAnimated"
      [addable]="addable"
      [addIcon]="vtsAddIcon"
      [hideBar]="vtsHideAll"
      [position]="position"
      [extraTemplate]="vtsTabBarExtraContent"
      (tabScroll)="vtsTabListScroll.emit($event)"
      (selectFocusedIndex)="setSelectedIndex($event)"
      (addClicked)="onAdd()"
    >
      <div
        class="vts-tabs-tab"
        [style.margin-right.px]="position === 'horizontal' ? vtsTabBarGutter : null"
        [style.margin-bottom.px]="position === 'vertical' ? vtsTabBarGutter : null"
        [class.vts-tabs-tab-active]="vtsSelectedIndex === i"
        [class.vts-tabs-tab-disabled]="tab.vtsDisabled"
        (click)="clickNavItem(tab, i, $event)"
        (contextmenu)="contextmenuNavItem(tab, $event)"
        *ngFor="let tab of tabs; let i = index"
      >
        <div
          role="tab"
          [attr.tabIndex]="getTabIndex(tab, i)"
          [attr.aria-disabled]="tab.vtsDisabled"
          [attr.aria-selected]="vtsSelectedIndex === i && !vtsHideAll"
          [attr.aria-controls]="getTabContentId(i)"
          [disabled]="tab.vtsDisabled"
          [tab]="tab"
          [active]="vtsSelectedIndex === i"
          class="vts-tabs-tab-btn"
          vtsTabNavItem
          cdkMonitorElementFocus
        >
          <ng-container *vtsStringTemplateOutlet="tab.label; context: { visible: true }">
            {{ tab.label }}
          </ng-container>
          <button
            vts-tab-close-button
            *ngIf="tab.vtsClosable && closable && !tab.vtsDisabled"
            [closeIcon]="tab.vtsCloseIcon"
            (click)="onClose(i, $event)"
          ></button>
        </div>
      </div>
    </vts-tabs-nav>
    <div class="vts-tabs-content-holder">
      <div
        class="vts-tabs-content"
        [class.vts-tabs-content-top]="vtsTabPosition === 'top'"
        [class.vts-tabs-content-bottom]="vtsTabPosition === 'bottom'"
        [class.vts-tabs-content-left]="vtsTabPosition === 'left'"
        [class.vts-tabs-content-right]="vtsTabPosition === 'right'"
        [class.vts-tabs-content-animated]="tabPaneAnimated"
        [style.margin-left]="getTabContentMarginLeft()"
        [style.margin-right]="getTabContentMarginRight()"
      >
        <div
          vts-tab-body
          *ngFor="let tab of tabs; let i = index"
          [active]="vtsSelectedIndex == i && !vtsHideAll"
          [content]="tab.content"
          [forceRender]="tab.vtsForceRender"
          [tabPaneAnimated]="tabPaneAnimated"
        ></div>
      </div>
    </div>
  `,
  host: {
    class: 'vts-tabs',
    '[class.vts-tabs-card]': `vtsType === 'card' || vtsType === 'editable-card'`,
    '[class.vts-tabs-editable]': `vtsType === 'editable-card'`,
    '[class.vts-tabs-editable-card]': `vtsType === 'editable-card'`,
    '[class.vts-tabs-centered]': `vtsCentered`,
    '[class.vts-tabs-rtl]': `dir === 'rtl'`,
    '[class.vts-tabs-top]': `vtsTabPosition === 'top'`,
    '[class.vts-tabs-bottom]': `vtsTabPosition === 'bottom'`,
    '[class.vts-tabs-left]': `vtsTabPosition === 'left'`,
    '[class.vts-tabs-right]': `vtsTabPosition === 'right'`,
    '[class.vts-tabs-default]': `vtsSize === 'md'`,
    '[class.vts-tabs-small]': `vtsSize === 'sm'`,
    '[class.vts-tabs-large]': `vtsSize === 'lg'`
  }
})
export class VtsTabSetComponent
  implements OnInit, AfterContentChecked, OnDestroy, AfterContentInit
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsHideAdd: BooleanInput;
  static ngAcceptInputType_vtsHideAll: BooleanInput;
  static ngAcceptInputType_vtsCentered: BooleanInput;
  static ngAcceptInputType_vtsLinkRouter: BooleanInput;
  static ngAcceptInputType_vtsLinkExact: BooleanInput;
  static ngAcceptInputType_vtsSelectedIndex: NumberInput;

  @Input()
  get vtsSelectedIndex(): number | null {
    return this.selectedIndex;
  }
  set vtsSelectedIndex(value: null | number) {
    this.indexToSelect = coerceNumberProperty(value, null);
  }
  @Input() vtsTabPosition: VtsTabPosition = 'top';
  @Input() vtsTabBarExtraContent?: TemplateRef<void>;
  @Input() vtsCanDeactivate: VtsTabsCanDeactivateFn | null = null;
  @Input() vtsAddIcon: string | TemplateRef<VtsSafeAny> = 'plus';
  @Input() vtsTabBarStyle: { [key: string]: string } | null = null;
  @Input() @WithConfig() vtsType: VtsTabType = 'line';
  @Input() @WithConfig() vtsSize: VtsSizeXLMSType = 'md';
  @Input() @WithConfig() vtsAnimated: VtsAnimatedInterface | boolean = true;
  @Input() @WithConfig() vtsTabBarGutter?: number = undefined;
  @Input() @InputBoolean() vtsHideAdd: boolean = false;
  @Input() @InputBoolean() vtsCentered: boolean = false;
  @Input() @InputBoolean() vtsHideAll = false;
  @Input() @InputBoolean() vtsLinkRouter = false;
  @Input() @InputBoolean() vtsLinkExact = true;

  @Output()
  readonly vtsSelectChange: EventEmitter<VtsTabChangeEvent> = new EventEmitter<VtsTabChangeEvent>(
    true
  );
  @Output()
  readonly vtsSelectedIndexChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly vtsTabListScroll = new EventEmitter<VtsTabScrollEvent>();
  @Output() readonly vtsClose = new EventEmitter<{ index: number }>();
  @Output() readonly vtsAdd = new EventEmitter<void>();

  get position(): VtsTabPositionMode {
    return ['top', 'bottom'].indexOf(this.vtsTabPosition) === -1 ? 'vertical' : 'horizontal';
  }

  get addable(): boolean {
    return this.vtsType === 'editable-card' && !this.vtsHideAdd;
  }

  get closable(): boolean {
    return this.vtsType === 'editable-card';
  }

  get line(): boolean {
    return this.vtsType === 'line';
  }

  get inkBarAnimated(): boolean {
    return (
      this.line &&
      (typeof this.vtsAnimated === 'boolean' ? this.vtsAnimated : this.vtsAnimated.inkBar)
    );
  }

  get tabPaneAnimated(): boolean {
    return (
      this.position === 'horizontal' &&
      this.line &&
      (typeof this.vtsAnimated === 'boolean' ? this.vtsAnimated : this.vtsAnimated.tabPane)
    );
  }

  // Pick up only direct descendants under ivy rendering engine
  // We filter out only the tabs that belong to this tab set in `tabs`.
  @ContentChildren(VtsTabComponent, { descendants: true })
  allTabs: QueryList<VtsTabComponent> = new QueryList<VtsTabComponent>();
  @ViewChild(VtsTabNavBarComponent, { static: false })
  tabNavBarRef!: VtsTabNavBarComponent;

  // All the direct tabs for this tab set
  tabs: QueryList<VtsTabComponent> = new QueryList<VtsTabComponent>();

  dir: Direction = 'ltr';
  private readonly tabSetId!: number;
  private destroy$ = new Subject<void>();
  private indexToSelect: number | null = 0;
  private selectedIndex: number | null = null;
  private tabLabelSubscription = Subscription.EMPTY;
  private tabsSubscription = Subscription.EMPTY;
  private canDeactivateSubscription = Subscription.EMPTY;

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    @Optional() private router: Router
  ) {
    this.tabSetId = nextId++;
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.tabs.destroy();
    this.tabLabelSubscription.unsubscribe();
    this.tabsSubscription.unsubscribe();
    this.canDeactivateSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    Promise.resolve().then(() => {
      this.setUpRouter();
    });
    this.subscribeToTabLabels();
    this.subscribeToAllTabChanges();

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabsSubscription = this.tabs.changes.subscribe(() => {
      const indexToSelect = this.clampTabIndex(this.indexToSelect);

      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this.selectedIndex) {
        const tabs = this.tabs.toArray();

        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].isActive) {
            // Assign both to the `indexToSelect` and `selectedIndex` so we don't fire a changed
            // event, otherwise the consumer may end up in an infinite loop in some edge cases like
            // adding a tab within the `vtsSelectedIndexChange` event.
            this.indexToSelect = this.selectedIndex = i;
            break;
          }
        }
      }
      this.subscribeToTabLabels();
      this.cdr.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    const indexToSelect = (this.indexToSelect = this.clampTabIndex(this.indexToSelect));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this.selectedIndex !== indexToSelect) {
      const isFirstRun = this.selectedIndex == null;

      if (!isFirstRun) {
        this.vtsSelectChange.emit(this.createChangeEvent(indexToSelect));
      }

      // Changing these values after change detection has run
      // since the checked content may contain references to them.
      Promise.resolve().then(() => {
        this.tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));

        if (!isFirstRun) {
          this.vtsSelectedIndexChange.emit(indexToSelect);
        }
      });
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this.tabs.forEach((tab: VtsTabComponent, index: number) => {
      tab.position = index - indexToSelect;

      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this.selectedIndex;
      }
    });

    if (this.selectedIndex !== indexToSelect) {
      this.selectedIndex = indexToSelect;
      this.cdr.markForCheck();
    }
  }

  onClose(index: number, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.vtsClose.emit({ index });
  }

  onAdd(): void {
    this.vtsAdd.emit();
  }

  private clampTabIndex(index: number | null): number {
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }

  private createChangeEvent(index: number): VtsTabChangeEvent {
    const event = new VtsTabChangeEvent();
    event.index = index;
    if (this.tabs && this.tabs.length) {
      event.tab = this.tabs.toArray()[index];
      this.tabs.forEach((tab, i) => {
        if (i !== index) {
          tab.vtsDeselect.emit();
        }
      });
      event.tab.vtsSelect.emit();
    }
    return event;
  }

  private subscribeToTabLabels(): void {
    if (this.tabLabelSubscription) {
      this.tabLabelSubscription.unsubscribe();
    }

    this.tabLabelSubscription = merge(...this.tabs.map(tab => tab.stateChanges)).subscribe(() =>
      this.cdr.markForCheck()
    );
  }

  private subscribeToAllTabChanges(): void {
    this.allTabs.changes
      .pipe(startWith(this.allTabs))
      .subscribe((tabs: QueryList<VtsTabComponent>) => {
        this.tabs.reset(tabs.filter(tab => tab.closestTabSet === this));
        this.tabs.notifyOnChanges();
      });
  }

  canDeactivateFun(pre: number, next: number): Observable<boolean> {
    if (typeof this.vtsCanDeactivate === 'function') {
      const observable = wrapIntoObservable(this.vtsCanDeactivate(pre, next));
      return observable.pipe(first(), takeUntil(this.destroy$));
    } else {
      return of(true);
    }
  }

  clickNavItem(tab: VtsTabComponent, index: number, e: MouseEvent): void {
    if (!tab.vtsDisabled) {
      // ignore vtsCanDeactivate
      tab.vtsClick.emit();
      if (!this.isRouterLinkClickEvent(index, e)) {
        this.setSelectedIndex(index);
      }
    }
  }

  private isRouterLinkClickEvent(index: number, event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    if (this.vtsLinkRouter) {
      return !!this.tabs.toArray()[index]?.linkDirective?.elementRef.nativeElement.contains(target);
    } else {
      return false;
    }
  }

  contextmenuNavItem(tab: VtsTabComponent, e: MouseEvent): void {
    if (!tab.vtsDisabled) {
      // ignore vtsCanDeactivate
      tab.vtsContextmenu.emit(e);
    }
  }

  setSelectedIndex(index: number): void {
    this.canDeactivateSubscription.unsubscribe();
    this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex!, index).subscribe(
      can => {
        if (can) {
          this.vtsSelectedIndex = index;
          this.tabNavBarRef.focusIndex = index;
          this.cdr.markForCheck();
        }
      }
    );
  }

  getTabIndex(tab: VtsTabComponent, index: number): number | null {
    if (tab.vtsDisabled) {
      return null;
    }
    return this.selectedIndex === index ? 0 : -1;
  }

  getTabContentId(i: number): string {
    return `vts-tabs-${this.tabSetId}-tab-${i}`;
  }

  private setUpRouter(): void {
    if (this.vtsLinkRouter) {
      if (!this.router) {
        throw new Error(
          `${PREFIX} you should import 'RouterModule' if you want to use 'vtsLinkRouter'!`
        );
      }
      this.router.events
        .pipe(
          takeUntil(this.destroy$),
          filter(e => e instanceof NavigationEnd),
          startWith(true),
          delay(0)
        )
        .subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
    }
  }

  private updateRouterActive(): void {
    if (this.router.navigated) {
      const index = this.findShouldActiveTabIndex();
      if (index !== this.selectedIndex) {
        this.setSelectedIndex(index);
      }
      this.vtsHideAll = index === -1;
    }
  }

  private findShouldActiveTabIndex(): number {
    const tabs = this.tabs.toArray();
    const isActive = this.isLinkActive(this.router);

    return tabs.findIndex(tab => {
      const c = tab.linkDirective;
      return c ? isActive(c.routerLink) || isActive(c.routerLinkWithHref) : false;
    });
  }

  private isLinkActive(router: Router): (link?: RouterLink | RouterLinkWithHref) => boolean {
    return (link?: RouterLink | RouterLinkWithHref) =>
      link?.urlTree ? router.isActive(link.urlTree, this.vtsLinkExact) : false;
  }

  private getTabContentMarginValue(): number {
    return -(this.vtsSelectedIndex || 0) * 100;
  }

  getTabContentMarginLeft(): string {
    if (this.tabPaneAnimated) {
      if (this.dir !== 'rtl') {
        return this.getTabContentMarginValue() + '%';
      }
    }
    return '';
  }
  getTabContentMarginRight(): string {
    if (this.tabPaneAnimated) {
      if (this.dir === 'rtl') {
        return this.getTabContentMarginValue() + '%';
      }
    }
    return '';
  }
}
