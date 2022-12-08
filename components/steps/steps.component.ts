/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@ui-vts/ng-vts/core/util';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { BooleanInput, NgClassType, VtsSizeDSType } from '@ui-vts/ng-vts/core/types';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { VtsStepComponent } from './step.component';

export type VtsDirectionType = 'horizontal' | 'vertical';
export type VtsStatusType = 'wait' | 'process' | 'finish' | 'error';
export type vtsProgressDotTemplate = TemplateRef<{
  $implicit: TemplateRef<void>;
  status: string;
  index: number;
}>;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'vts-steps',
  exportAs: 'vtsSteps',
  template: `
    <div class="vts-steps" [ngClass]="classMap">
      <ng-content></ng-content>
    </div>
  `
})
export class VtsStepsComponent implements OnChanges, OnInit, OnDestroy, AfterContentInit {
  static ngAcceptInputType_vtsProgressDot: BooleanInput | vtsProgressDotTemplate | undefined | null;

  @ContentChildren(VtsStepComponent) steps!: QueryList<VtsStepComponent>;

  @Input() vtsCurrent = 0;
  @Input() vtsDirection: VtsDirectionType = 'horizontal';
  @Input() vtsLabelPlacement: 'horizontal' | 'vertical' = 'horizontal';
  @Input() vtsType: 'default' | 'navigation' = 'default';
  @Input() vtsSize: VtsSizeDSType = 'md';
  @Input() vtsStartIndex = 0;
  @Input() vtsStatus: VtsStatusType = 'process';

  @Input()
  set vtsProgressDot(value: boolean | vtsProgressDotTemplate) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }

  @Output() readonly vtsIndexChange = new EventEmitter<number>();

  private destroy$ = new Subject<void>();
  private indexChangeSubscription?: Subscription;

  showProcessDot = false;
  customProcessDotTemplate?: TemplateRef<{
    $implicit: TemplateRef<void>;
    status: string;
    index: number;
  }>;
  classMap: NgClassType = {};
  dir: Direction = 'ltr';

  constructor(private cdr: ChangeDetectorRef, @Optional() private directionality: Directionality) {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsStartIndex || changes.vtsDirection || changes.vtsStatus || changes.vtsCurrent) {
      this.updateChildrenSteps();
    }
    if (
      changes.vtsDirection ||
      changes.vtsProgressDot ||
      changes.vtsLabelPlacement ||
      changes.vtsSize
    ) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.setClassMap();
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
    this.setClassMap();
    this.updateChildrenSteps();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.indexChangeSubscription) {
      this.indexChangeSubscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    if (this.steps) {
      this.steps.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
        this.updateChildrenSteps();
      });
    }
  }

  private updateChildrenSteps(): void {
    if (this.steps) {
      const length = this.steps.length;
      this.steps.toArray().forEach((step, index) => {
        Promise.resolve().then(() => {
          step.outStatus = this.vtsStatus;
          step.showProcessDot = this.showProcessDot;
          if (this.customProcessDotTemplate) {
            step.customProcessTemplate = this.customProcessDotTemplate;
          }
          step.clickable = this.vtsIndexChange.observers.length > 0;
          step.direction = this.vtsDirection;
          step.index = index + this.vtsStartIndex;
          step.currentIndex = this.vtsCurrent;
          step.last = length === index + 1;
          step.markForCheck();
        });
      });
      if (this.indexChangeSubscription) {
        this.indexChangeSubscription.unsubscribe();
      }
      this.indexChangeSubscription = merge(...this.steps.map(step => step.click$)).subscribe(
        index => this.vtsIndexChange.emit(index)
      );
    }
  }

  private setClassMap(): void {
    this.classMap = {
      [`vts-steps-${this.vtsDirection}`]: true,
      [`vts-steps-label-horizontal`]: this.vtsDirection === 'horizontal',
      [`vts-steps-label-vertical`]:
        (this.showProcessDot || this.vtsLabelPlacement === 'vertical') &&
        this.vtsDirection === 'horizontal',
      [`vts-steps-dot`]: this.showProcessDot,
      ['vts-steps-small']: this.vtsSize === 'sm',
      ['vts-steps-navigation']: this.vtsType === 'navigation',
      ['vts-steps-rtl']: this.dir === 'rtl'
    };
  }
}
