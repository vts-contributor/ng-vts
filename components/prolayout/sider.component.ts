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
  ContentChild,
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
import { 
  VtsMenuDirective, 
  // VtsMenuThemeType 
} from '@ui-vts/ng-vts/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuItemProLayout } from './pro-layout.types';
import { renderMenuProLayout } from './utils';

@Component({
  selector: 'vts-prolayout-sider',
  exportAs: 'vtsProlayoutSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vts-prolayout-sider-children">
      <div class="logo-sider vts-logo" *ngIf="!isFixedHeader && isFixedSider"></div> 
      <ul vts-menu vtsMode="inline" class="sider-menu">
        <ng-container *ngFor="let item of menuData">
          <vts-prolayout-menu-item [menuItem]="item"></vts-prolayout-menu-item>
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
  @ContentChild(VtsMenuDirective)
  vtsMenuDirective: VtsMenuDirective | null = null;
  @Output() readonly vtsCollapsedChange = new EventEmitter();
  @Input() vtsWidth: string | number = 200;
  @Input() vtsTheme: string = 'light';
  @Input() vtsCollapsedWidth = 70;
  @Input() vtsBreakpoint: VtsBreakpointKey | null = null;
  @Input() vtsZeroTrigger: TemplateRef<void> | null = null;
  @Input() vtsTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() @InputBoolean() vtsReverseArrow = false;
  @Input() @InputBoolean() vtsCollapsible = false;
  @Input() @InputBoolean() vtsCollapsed = false;
  @Input() isFixedHeader: boolean = false;
  @Input() isFixedSider: boolean = false;
  @Input() menuData: MenuItemProLayout[] = [];
  @Input() useDarkMode: boolean = false;
  @Input() menuHeader: MenuItemProLayout[] = []; // if splitmenu = true -> merge both and display in sider
  @Input() useSplitMenu: boolean = false;

  matchBreakPoint = false;
  flexSetting: string | null = null;
  widthSetting: string | null = null;

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

  renderMenuSider() {
    return renderMenuProLayout(this.menuData);
  }

  constructor(
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService,
    private elementRef: ElementRef
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsCollapsed, vtsCollapsedWidth, vtsWidth, vtsTheme, useSplitMenu } = changes;
    if (vtsCollapsed || vtsCollapsedWidth || vtsWidth) {
      this.updateStyleMap();
    }
    if (vtsCollapsed) {
      this.updateMenuInlineCollapsed();
    }
    if(vtsTheme){
      console.log('theme changed: ', vtsTheme);
    }
    if(useSplitMenu){
      if(useSplitMenu.currentValue){
        this.menuData = [
          ...this.menuData,
          ...this.menuHeader
        ]
      }
    }
  }

  ngAfterContentInit(): void {
    this.updateMenuInlineCollapsed();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
