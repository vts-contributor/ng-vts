/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBadgeMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { badgePresetColors } from './preset-colors';
import { VtsBadgeStatusType } from './types';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'badge';

@Component({
  selector: 'vts-badge',
  exportAs: 'vtsBadge',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  template: `
    <ng-container *ngIf="vtsStatus || vtsColor">
      <span
        class="vts-badge-status-dot vts-badge-status-{{ vtsStatus || presetColor }}"
        [style.background]="!presetColor && vtsColor"
        [ngStyle]="vtsStyle"
      ></span>
      <span class="vts-badge-status-text">
        <ng-container *vtsStringTemplateOutlet="vtsText">
          {{ vtsText }}
        </ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *vtsStringTemplateOutlet="vtsCount">
      <vts-badge-sup
        *ngIf="showSup"
        [vtsOffset]="vtsOffset"
        [vtsTitle]="vtsTitle"
        [vtsStyle]="vtsStyle"
        [vtsDot]="vtsDot"
        [vtsOverflowCount]="vtsOverflowCount"
        [disableAnimation]="!!(vtsStandalone || vtsStatus || vtsColor)"
        [vtsCount]="vtsCount"
      ></vts-badge-sup>
    </ng-container>
  `,
  host: {
    '[class.vts-badge-status]': 'vtsStatus',
    '[class.vts-badge-not-a-wrapper]': '!!(vtsStandalone || vtsStatus || vtsColor)'
  }
})
export class VtsBadgeComponent implements OnChanges, OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsShowZero: BooleanInput;
  static ngAcceptInputType_vtsShowDot: BooleanInput;
  static ngAcceptInputType_vtsDot: BooleanInput;
  static ngAcceptInputType_vtsStandalone: BooleanInput;
  showSup = false;
  presetColor: string | null = null;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  @Input() @InputBoolean() vtsShowZero: boolean = false;
  @Input() @InputBoolean() vtsShowDot = true;
  @Input() @InputBoolean() vtsStandalone = false;
  @Input() @InputBoolean() vtsDot = false;
  @Input() @WithConfig() vtsOverflowCount: number = 99;
  @Input() @WithConfig() vtsColor?: string = undefined;
  @Input() vtsStyle: { [key: string]: string } | null = null;
  @Input() vtsText?: string | TemplateRef<void> | null = null;
  @Input() vtsTitle?: string | null | undefined;
  @Input() vtsStatus?: VtsBadgeStatusType | string;
  @Input() vtsCount?: number | TemplateRef<VtsSafeAny>;
  @Input() vtsOffset?: [number, number];

  constructor(
    public vtsConfigService: VtsConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-badge');
  }
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.prepareBadgeForRtl();
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.prepareBadgeForRtl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsColor, vtsShowDot, vtsDot, vtsCount, vtsShowZero } = changes;
    if (vtsColor) {
      this.presetColor =
        this.vtsColor && badgePresetColors.indexOf(this.vtsColor) !== -1 ? this.vtsColor : null;
    }
    if (vtsShowDot || vtsDot || vtsCount || vtsShowZero) {
      this.showSup =
        (this.vtsShowDot && this.vtsDot) ||
        this.vtsCount! > 0 ||
        (this.vtsCount! <= 0 && this.vtsShowZero);
    }
  }

  private prepareBadgeForRtl(): void {
    if (this.isRtlLayout) {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-badge-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-badge-rtl');
    }
  }

  get isRtlLayout(): boolean {
    return this.dir === 'rtl';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
