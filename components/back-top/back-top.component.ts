/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { fadeMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsScrollService } from '@ui-vts/ng-vts/core/services';
import { NumberInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputNumber } from '@ui-vts/ng-vts/core/util';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'backTop';

@Component({
  selector: 'vts-back-top',
  exportAs: 'vtsBackTop',
  animations: [fadeMotion],
  template: `
    <div
      class="vts-back-top"
      [class.vts-back-top-rtl]="dir === 'rtl'"
      (click)="clickBackTop()"
      @fadeMotion
      *ngIf="visible"
    >
      <ng-template #defaultContent>
        <div class="vts-back-top-content">
          <div class="vts-back-top-icon">
            <i vts-icon vtsType="Eject"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="vtsTemplate || defaultContent"></ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class VtsBackTopComponent implements OnInit, OnDestroy, OnChanges {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsVisibilityHeight: NumberInput;
  static ngAcceptInputType_vtsDuration: NumberInput;

  private scrollListenerDestroy$ = new Subject();
  private destroy$ = new Subject();
  private target: HTMLElement | null = null;

  visible: boolean = false;
  dir: Direction = 'ltr';

  @Input() vtsTemplate?: TemplateRef<void>;
  @Input() @WithConfig() @InputNumber() vtsVisibilityHeight: number = 400;
  @Input() vtsTarget?: string | HTMLElement;
  @Input() @InputNumber() vtsDuration: number = 450;
  @Output() readonly vtsClick: EventEmitter<boolean> = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private doc: VtsSafeAny,
    public vtsConfigService: VtsConfigService,
    private scrollSrv: VtsScrollService,
    private platform: Platform,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    this.dir = this.directionality.value;
  }

  ngOnInit(): void {
    this.registerScrollEvent();

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 0, {
      duration: this.vtsDuration
    });
    this.vtsClick.emit(true);
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.vtsVisibilityHeight) {
      return;
    }
    this.visible = !this.visible;
    this.cd.detectChanges();
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.scrollListenerDestroy$.next();
    this.handleScroll();
    this.zone.runOutsideAngular(() => {
      fromEvent(this.getTarget(), 'scroll')
        .pipe(throttleTime(50), takeUntil(this.scrollListenerDestroy$))
        .subscribe(() => this.handleScroll());
    });
  }

  ngOnDestroy(): void {
    this.scrollListenerDestroy$.next();
    this.scrollListenerDestroy$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsTarget } = changes;
    if (vtsTarget) {
      this.target =
        typeof this.vtsTarget === 'string'
          ? this.doc.querySelector(this.vtsTarget)
          : this.vtsTarget;
      this.registerScrollEvent();
    }
  }
}
