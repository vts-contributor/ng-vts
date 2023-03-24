/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NumberInput, VtsSafeAny, VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';

import { BehaviorSubject, ReplaySubject, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'spin';

@Component({
  selector: 'vts-spin',
  exportAs: 'vtsSpin',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #defaultTemplate>
      <!--
        <span class="vts-spin-dot vts-spin-dot-spin">
          <i class="vts-spin-dot-item"></i>
          <i class="vts-spin-dot-item"></i>
          <i class="vts-spin-dot-item"></i>
          <i class="vts-spin-dot-item"></i>
        </span>
      -->
      <div style="display:flex; height: 100%; align-items: flex-end; justify-content:center;">
        <i style="font-size: 75px;" vts-icon vtsType="icon:vts-spin"></i>
      </div>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="vts-spin"
        [class.vts-spin-rtl]="dir === 'rtl'"
        [class.vts-spin-spinning]="isLoading"
        [class.vts-spin-lg]="vtsSize === 'lg'"
        [class.vts-spin-sm]="vtsSize === 'sm'"
        [class.vts-spin-show-text]="vtsTip"
      >
        <ng-template [ngTemplateOutlet]="vtsIndicator || defaultTemplate"></ng-template>
        <div class="vts-spin-text" *ngIf="vtsTip">{{ vtsTip }}</div>
      </div>
    </div>
    <div *ngIf="!vtsSimple" class="vts-spin-container" [class.vts-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.vts-spin-nested-loading]': '!vtsSimple'
  }
})
export class VtsSpinComponent implements OnChanges, OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsDelay: NumberInput;
  static ngAcceptInputType_vtsSimple: BooleanInput;
  static ngAcceptInputType_vtsSpinning: BooleanInput;

  @Input() @WithConfig() vtsIndicator: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsSize: VtsSizeLDSType = 'md';
  @Input() vtsTip: string | null = null;
  @Input() @InputNumber() vtsDelay = 0;
  @Input() @InputBoolean() vtsSimple = false;
  @Input() @InputBoolean() vtsSpinning = true;
  private destroy$ = new Subject<void>();
  private spinning$ = new BehaviorSubject(this.vtsSpinning);
  private delay$ = new ReplaySubject<number>(1);
  isLoading = false;
  dir: Direction = 'ltr';

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    const loading$ = this.delay$.pipe(
      startWith(this.vtsDelay),
      distinctUntilChanged(),
      switchMap(delay => {
        if (delay === 0) {
          return this.spinning$;
        }

        return this.spinning$.pipe(debounce(spinning => timer(spinning ? delay : 0)));
      }),
      takeUntil(this.destroy$)
    );
    loading$.subscribe(loading => {
      this.isLoading = loading;
      this.cdr.markForCheck();
    });
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsSpinning, vtsDelay } = changes;
    if (vtsSpinning) {
      this.spinning$.next(this.vtsSpinning);
    }
    if (vtsDelay) {
      this.delay$.next(this.vtsDelay);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
