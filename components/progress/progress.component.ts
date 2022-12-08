/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { NgStyleInterface, NumberInput } from '@ui-vts/ng-vts/core/types';
import { InputNumber, isNotNil } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  VtsProgressCirclePath,
  VtsProgressColorGradient,
  VtsProgressFormatter,
  VtsProgressGapPositionType,
  VtsProgressGradientProgress,
  VtsProgressStatusType,
  VtsProgressStepItem,
  VtsProgressStrokeColorType,
  VtsProgressStrokeLinecapType,
  VtsProgressTypeType
} from './typings';
import { handleCircleGradient, handleLinearGradient } from './utils';

let gradientIdSeed = 0;

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'progress';
const statusIconNameMap = new Map([
  ['success', 'check'],
  ['exception', 'close']
]);
const statusColorMap = new Map([
  ['normal', '#108ee9'],
  ['exception', '#ff5500'],
  ['success', '#87d068']
]);
const defaultFormatter: VtsProgressFormatter = (p: number): string => `${p}%`;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-progress',
  exportAs: 'vtsProgress',
  preserveWhitespaces: false,
  template: `
    <ng-template #progressInfoTemplate>
      <span class="vts-progress-text" *ngIf="vtsShowInfo">
        <ng-container
          *ngIf="
            (status === 'exception' || status === 'success') && !vtsFormat;
            else formatTemplate
          "
        >
          <i vts-icon [vtsType]="icon"></i>
        </ng-container>
        <ng-template #formatTemplate>
          <ng-container
            *vtsStringTemplateOutlet="formatter; context: { $implicit: vtsPercent }; let formatter"
          >
            {{ formatter(vtsPercent) }}
          </ng-container>
        </ng-template>
      </span>
    </ng-template>

    <div
      [ngClass]="'vts-progress vts-progress-status-' + status"
      [class.vts-progress-line]="vtsType == 'line'"
      [class.vts-progress-small]="vtsSize == 'small'"
      [class.vts-progress-show-info]="vtsShowInfo"
      [class.vts-progress-circle]="isCircleStyle"
      [class.vts-progress-steps]="isSteps"
      [class.vts-progress-rtl]="dir === 'rtl'"
    >
      <!-- line progress -->
      <div *ngIf="vtsType === 'line'">
        <!-- normal line style -->
        <ng-container *ngIf="!isSteps">
          <div class="vts-progress-outer" *ngIf="!isSteps">
            <div class="vts-progress-inner">
              <div
                class="vts-progress-bg"
                [style.width.%]="vtsPercent"
                [style.border-radius]="vtsStrokeLinecap === 'round' ? '100px' : '0'"
                [style.background]="!isGradient ? vtsStrokeColor : null"
                [style.background-image]="isGradient ? lineGradient : null"
                [style.height.px]="strokeWidth"
              ></div>
              <div
                *ngIf="vtsSuccessPercent || vtsSuccessPercent === 0"
                class="vts-progress-success-bg"
                [style.width.%]="vtsSuccessPercent"
                [style.border-radius]="vtsStrokeLinecap === 'round' ? '100px' : '0'"
                [style.height.px]="strokeWidth"
              ></div>
            </div>
          </div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </ng-container>
        <!-- step style -->
        <div class="vts-progress-steps-outer" *ngIf="isSteps">
          <div
            *ngFor="let step of steps; let i = index"
            class="vts-progress-steps-item"
            [ngStyle]="step"
          ></div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </div>
      </div>

      <!-- circle / dashboard progress -->
      <div
        [style.width.px]="this.vtsWidth"
        [style.height.px]="this.vtsWidth"
        [style.fontSize.px]="this.vtsWidth * 0.15 + 6"
        class="vts-progress-inner"
        [class.vts-progress-circle-gradient]="isGradient"
        *ngIf="isCircleStyle"
      >
        <svg class="vts-progress-circle " viewBox="0 0 100 100">
          <defs *ngIf="isGradient">
            <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop
                *ngFor="let i of circleGradient"
                [attr.offset]="i.offset"
                [attr.stop-color]="i.color"
              ></stop>
            </linearGradient>
          </defs>
          <path
            class="vts-progress-circle-trail"
            stroke="#f3f3f3"
            fill-opacity="0"
            [attr.stroke-width]="strokeWidth"
            [attr.d]="pathString"
            [ngStyle]="trailPathStyle"
          ></path>
          <path
            *ngFor="let p of progressCirclePath; trackBy: trackByFn"
            class="vts-progress-circle-path"
            fill-opacity="0"
            [attr.d]="pathString"
            [attr.stroke-linecap]="vtsStrokeLinecap"
            [attr.stroke]="p.stroke"
            [attr.stroke-width]="vtsPercent ? strokeWidth : 0"
            [ngStyle]="p.strokePathStyle"
          ></path>
        </svg>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
    </div>
  `
})
export class VtsProgressComponent implements OnChanges, OnInit, OnDestroy {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsSuccessPercent: NumberInput;
  static ngAcceptInputType_vtsPercent: NumberInput;
  static ngAcceptInputType_vtsStrokeWidth: NumberInput;
  static ngAcceptInputType_vtsGapDegree: NumberInput;
  static ngAcceptInputType_vtsSteps: NumberInput;

  @Input() @WithConfig() vtsShowInfo: boolean = true;
  @Input() vtsWidth = 132;
  @Input()
  @WithConfig()
  vtsStrokeColor?: VtsProgressStrokeColorType = undefined;
  @Input() @WithConfig() vtsSize: 'default' | 'small' = 'default';
  @Input() vtsFormat?: VtsProgressFormatter;
  @Input() @InputNumber() vtsSuccessPercent?: number;
  @Input() @InputNumber() vtsPercent: number = 0;
  @Input() @WithConfig() @InputNumber() vtsStrokeWidth?: number = undefined;
  @Input() @WithConfig() @InputNumber() vtsGapDegree?: number = undefined;
  @Input() vtsStatus?: VtsProgressStatusType;
  @Input() vtsType: VtsProgressTypeType = 'line';
  @Input() @WithConfig() vtsGapPosition: VtsProgressGapPositionType = 'top';
  @Input() @WithConfig() vtsStrokeLinecap: VtsProgressStrokeLinecapType = 'round';

  @Input() @InputNumber() vtsSteps: number = 0;

  steps: VtsProgressStepItem[] = [];

  /** Gradient style when `vtsType` is `line`. */
  lineGradient: string | null = null;

  /** If user uses gradient color. */
  isGradient = false;

  /** If the linear progress is a step progress. */
  isSteps = false;

  /**
   * Each progress whose `vtsType` is circle or dashboard should have unique id to
   * define `<linearGradient>`.
   */
  gradientId = gradientIdSeed++;

  /** Paths to rendered in the template. */
  progressCirclePath: VtsProgressCirclePath[] = [];
  circleGradient?: Array<{ offset: string; color: string }>;
  trailPathStyle: NgStyleInterface | null = null;
  pathString?: string;
  icon!: string;

  dir: Direction = 'ltr';

  trackByFn = (index: number) => `${index}`;

  get formatter(): VtsProgressFormatter {
    return this.vtsFormat || defaultFormatter;
  }

  get status(): VtsProgressStatusType {
    return this.vtsStatus || this.inferredStatus;
  }

  get strokeWidth(): number {
    return this.vtsStrokeWidth || (this.vtsType === 'line' && this.vtsSize !== 'small' ? 8 : 6);
  }

  get isCircleStyle(): boolean {
    return this.vtsType === 'circle' || this.vtsType === 'dashboard';
  }

  private cachedStatus: VtsProgressStatusType = 'normal';
  private inferredStatus: VtsProgressStatusType = 'normal';
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    public vtsConfigService: VtsConfigService,
    @Optional() private directionality: Directionality
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsSteps,
      vtsGapPosition,
      vtsStrokeLinecap,
      vtsStrokeColor,
      vtsGapDegree,
      vtsType,
      vtsStatus,
      vtsPercent,
      vtsSuccessPercent,
      vtsStrokeWidth
    } = changes;

    if (vtsStatus) {
      this.cachedStatus = this.vtsStatus || this.cachedStatus;
    }

    if (vtsPercent || vtsSuccessPercent) {
      const fillAll = parseInt(this.vtsPercent.toString(), 10) >= 100;
      if (fillAll) {
        if (
          (isNotNil(this.vtsSuccessPercent) && this.vtsSuccessPercent! >= 100) ||
          this.vtsSuccessPercent === undefined
        ) {
          this.inferredStatus = 'success';
        }
      } else {
        this.inferredStatus = this.cachedStatus;
      }
    }

    if (vtsStatus || vtsPercent || vtsSuccessPercent || vtsStrokeColor) {
      this.updateIcon();
    }

    if (vtsStrokeColor) {
      this.setStrokeColor();
    }

    if (
      vtsGapPosition ||
      vtsStrokeLinecap ||
      vtsGapDegree ||
      vtsType ||
      vtsPercent ||
      vtsStrokeColor ||
      vtsStrokeColor
    ) {
      this.getCirclePaths();
    }

    if (vtsPercent || vtsSteps || vtsStrokeWidth) {
      this.isSteps = this.vtsSteps > 0;
      if (this.isSteps) {
        this.getSteps();
      }
    }
  }

  ngOnInit(): void {
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateIcon();
        this.setStrokeColor();
        this.getCirclePaths();
      });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateIcon(): void {
    const ret = statusIconNameMap.get(this.status);
    this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
  }

  /**
   * Calculate step render configs.
   */
  private getSteps(): void {
    const current = Math.floor(this.vtsSteps * (this.vtsPercent / 100));
    const stepWidth = this.vtsSize === 'small' ? 2 : 14;

    const steps = [];

    for (let i = 0; i < this.vtsSteps; i++) {
      let color;
      if (i <= current - 1) {
        color = this.vtsStrokeColor;
      }
      const stepStyle = {
        backgroundColor: `${color}`,
        width: `${stepWidth}px`,
        height: `${this.strokeWidth}px`
      };
      steps.push(stepStyle);
    }

    this.steps = steps;
  }

  /**
   * Calculate paths when the type is circle or dashboard.
   */
  private getCirclePaths(): void {
    if (!this.isCircleStyle) {
      return;
    }

    const values = isNotNil(this.vtsSuccessPercent)
      ? [this.vtsSuccessPercent!, this.vtsPercent]
      : [this.vtsPercent];

    // Calculate shared styles.
    const radius = 50 - this.strokeWidth / 2;
    const gapPosition = this.vtsGapPosition || (this.vtsType === 'circle' ? 'top' : 'bottom');
    const len = Math.PI * 2 * radius;
    const gapDegree = this.vtsGapDegree || (this.vtsType === 'circle' ? 0 : 75);

    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = radius * -2;

    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = radius * 2;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = radius * -2;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = radius * 2;
        break;
      default:
    }

    this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

    this.trailPathStyle = {
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    };

    // Calculate styles for each path.
    this.progressCirclePath = values
      .map((value, index) => {
        const isSuccessPercent = values.length === 2 && index === 0;
        return {
          stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
          strokePathStyle: {
            stroke: !this.isGradient
              ? isSuccessPercent
                ? statusColorMap.get('success')
                : (this.vtsStrokeColor as string)
              : null,
            transition:
              'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
            strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`
          }
        };
      })
      .reverse();
  }

  private setStrokeColor(): void {
    const color = this.vtsStrokeColor;
    const isGradient = (this.isGradient = !!color && typeof color !== 'string');
    if (isGradient && !this.isCircleStyle) {
      this.lineGradient = handleLinearGradient(color as VtsProgressColorGradient);
    } else if (isGradient && this.isCircleStyle) {
      this.circleGradient = handleCircleGradient(
        this.vtsStrokeColor as VtsProgressGradientProgress
      );
    } else {
      this.lineGradient = null;
      this.circleGradient = [];
    }
  }
}
