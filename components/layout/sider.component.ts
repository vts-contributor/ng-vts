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
import { VtsMenuDirective } from '@ui-vts/ng-vts/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-sider',
  exportAs: 'vtsSider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vts-layout-sider-children">
      <ng-content></ng-content>
    </div>
    <div
      *ngIf="vtsCollapsible && vtsTrigger !== null"
      vts-sider-trigger
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
    '[class.vts-layout-sider-zero-width]': `vtsCollapsed && vtsCollapsedWidth === 0`,
    '[class.vts-layout-sider-collapsed]': `vtsCollapsed`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
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

  // NG-vTS: force light theme, check origin
  private _vtsTheme = 'light';
  @Input()
  get vtsTheme() {
    return this._vtsTheme;
  }
  set vtsTheme(_value) {
    this._vtsTheme = 'light';
  }
  @Input() vtsCollapsedWidth = 70;
  @Input() vtsBreakpoint: VtsBreakpointKey | null = null;
  @Input() vtsZeroTrigger: TemplateRef<void> | null = null;
  @Input() vtsTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() @InputBoolean() vtsReverseArrow = false;
  @Input() @InputBoolean() vtsCollapsible = false;
  @Input() @InputBoolean() vtsCollapsed = false;
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

  constructor(
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-layout-sider');
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
    const { vtsCollapsed, vtsCollapsedWidth, vtsWidth } = changes;
    if (vtsCollapsed || vtsCollapsedWidth || vtsWidth) {
      this.updateStyleMap();
    }
    if (vtsCollapsed) {
      this.updateMenuInlineCollapsed();
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
