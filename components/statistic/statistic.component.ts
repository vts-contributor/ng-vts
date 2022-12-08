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
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-statistic',
  exportAs: 'vtsStatistic',
  template: `
    <div class="vts-statistic" [class.vts-statistic-rtl]="dir === 'rtl'">
      <div class="vts-statistic-title">
        <ng-container *vtsStringTemplateOutlet="vtsTitle">
          {{ vtsTitle }}
        </ng-container>
      </div>
      <div class="vts-statistic-content" [ngStyle]="vtsValueStyle">
        <span *ngIf="vtsPrefix" class="vts-statistic-content-prefix">
          <ng-container *vtsStringTemplateOutlet="vtsPrefix">
            {{ vtsPrefix }}
          </ng-container>
        </span>
        <vts-statistic-number
          [vtsValue]="vtsValue"
          [vtsValueTemplate]="vtsValueTemplate"
        ></vts-statistic-number>
        <span *ngIf="vtsSuffix" class="vts-statistic-content-suffix">
          <ng-container *vtsStringTemplateOutlet="vtsSuffix">
            {{ vtsSuffix }}
          </ng-container>
        </span>
      </div>
    </div>
  `
})
export class VtsStatisticComponent implements OnDestroy, OnInit {
  @Input() vtsPrefix?: string | TemplateRef<void>;
  @Input() vtsSuffix?: string | TemplateRef<void>;
  @Input() vtsTitle?: string | TemplateRef<void>;
  @Input() vtsValue?: VtsStatisticValueType;
  @Input() vtsValueStyle: NgStyleInterface = {};
  @Input() vtsValueTemplate?: TemplateRef<{ $implicit: VtsStatisticValueType }>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(
    protected cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
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
}
