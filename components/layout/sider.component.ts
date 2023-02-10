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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
  `,
  host: {
    '[class.vts-layout-sider]': 'true',
    '[class.vts-layout-sider-collapsed]': `vtsCollapsed`,
    '[style.flex]': 'flexSetting',
    '[style.maxWidth]': 'widthSetting',
    '[style.minWidth]': 'widthSetting',
    '[style.width]': 'widthSetting'
  }
})
export class VtsSiderComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  static ngAcceptInputType_vtsCollapsible: BooleanInput;
  static ngAcceptInputType_vtsCollapsed: BooleanInput;

  private destroy$ = new Subject();
  @ContentChild(VtsMenuDirective)
  vtsMenuDirective: VtsMenuDirective | null = null;
  @Output() readonly vtsCollapsedChange = new EventEmitter();
  @Input() vtsCollapsedWidth: null | number = null;
  @Input() vtsWidth: string | number = 240;

  @Input() vtsBreakpoint: VtsBreakpointKey | null = null;
  @Input() @InputBoolean() vtsCollapsed = false;
  matchBreakPoint = false;
  flexSetting: string | null = null;
  widthSetting: string | null = null;

  updateStyleMap(): void {
    this.widthSetting = this.vtsCollapsed
      ? this.vtsCollapsedWidth != null
        ? `${this.vtsCollapsedWidth}px`
        : 'auto'
      : toCssPixel(this.vtsWidth);
    this.flexSetting = `0 0 ${this.widthSetting}`;
    this.cdr.markForCheck();
  }

  updateMenuInlineCollapsed(): void {
    if (this.vtsMenuDirective && this.vtsMenuDirective.vtsMode === 'inline') {
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

  calculateCollapsedWidth() {
    try {
      const variable = getComputedStyle(document.documentElement)?.getPropertyValue(
        '--vts-menu-collapsed-width--'
      );
      if (!variable) return;
      const value = Number(variable.trim().replace('px', ''));
      if (this.vtsCollapsedWidth === null) this.vtsCollapsedWidth = value;
    } catch {}
  }

  constructor(
    private platform: Platform,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService
  ) {}

  ngOnInit(): void {
    this.calculateCollapsedWidth();
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
    const { vtsCollapsed, vtsWidth, vtsCollapsedWidth } = changes;

    if (vtsCollapsed || vtsWidth || vtsCollapsedWidth) {
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
