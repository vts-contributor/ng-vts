/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NgClassType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-step',
  exportAs: 'vtsStep',
  preserveWhitespaces: false,
  template: `
    <div
      class="vts-steps-item-container"
      [attr.role]="clickable && !vtsDisabled ? 'button' : null"
      [tabindex]="clickable && !vtsDisabled ? 0 : null"
      (click)="onClick()"
    >
      <div class="vts-steps-item-tail" *ngIf="last !== true"></div>
      <div class="vts-steps-item-icon">
        <ng-template [ngIf]="!showProcessDot">
          <span class="vts-steps-icon" *ngIf="vtsStatus === 'finish' && !vtsIcon">
            <i vts-icon vtsType="check"></i>
          </span>
          <span class="vts-steps-icon" *ngIf="vtsStatus === 'error'">
            <i vts-icon vtsType="Close"></i>
          </span>
          <span
            class="vts-steps-icon"
            *ngIf="(vtsStatus === 'process' || vtsStatus === 'wait') && !vtsIcon"
          >
            {{ index + 1 }}
          </span>
          <span class="vts-steps-icon" *ngIf="vtsIcon">
            <ng-container *vtsStringTemplateOutlet="vtsIcon; let icon">
              <i vts-icon [vtsType]="!oldAPIIcon && icon" [ngClass]="oldAPIIcon && icon"></i>
            </ng-container>
          </span>
        </ng-template>
        <ng-template [ngIf]="showProcessDot">
          <span class="vts-steps-icon">
            <ng-template #processDotTemplate>
              <span class="vts-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: vtsStatus,
                index: index
              }"
            ></ng-template>
          </span>
        </ng-template>
      </div>
      <div class="vts-steps-item-content">
        <div class="vts-steps-item-title">
          <ng-container *vtsStringTemplateOutlet="vtsTitle">
            {{ vtsTitle }}
          </ng-container>
          <div *ngIf="vtsSubtitle" class="vts-steps-item-subtitle">
            <ng-container *vtsStringTemplateOutlet="vtsSubtitle">
              {{ vtsSubtitle }}
            </ng-container>
          </div>
        </div>
        <div class="vts-steps-item-description">
          <ng-container *vtsStringTemplateOutlet="vtsDescription">
            {{ vtsDescription }}
          </ng-container>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'vts-steps-item',
    '[class.vts-steps-item-wait]': 'vtsStatus === "wait"',
    '[class.vts-steps-item-process]': 'vtsStatus === "process"',
    '[class.vts-steps-item-finish]': 'vtsStatus === "finish"',
    '[class.vts-steps-item-error]': 'vtsStatus === "error"',
    '[class.vts-steps-item-active]': 'currentIndex === index',
    '[class.vts-steps-item-disabled]': 'vtsDisabled',
    '[class.vts-steps-item-custom]': '!!vtsIcon',
    '[class.vts-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
  }
})
export class VtsStepComponent implements OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @ViewChild('processDotTemplate', { static: false })
  processDotTemplate?: TemplateRef<void>;

  @Input() vtsTitle?: string | TemplateRef<void>;
  @Input() vtsSubtitle?: string | TemplateRef<void>;
  @Input() vtsDescription?: string | TemplateRef<void>;
  @Input() @InputBoolean() vtsDisabled = false;

  @Input()
  get vtsStatus(): string {
    return this._status;
  }

  set vtsStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
  }

  isCustomStatus = false;
  private _status = 'wait';

  @Input()
  get vtsIcon(): NgClassType | TemplateRef<void> | undefined {
    return this._icon;
  }

  set vtsIcon(value: NgClassType | TemplateRef<void> | undefined) {
    if (!(value instanceof TemplateRef)) {
      this.oldAPIIcon = typeof value === 'string' && value.indexOf('vtsicon') > -1;
    } else {
    }
    this._icon = value;
  }

  oldAPIIcon = true;
  private _icon?: NgClassType | TemplateRef<void>;

  customProcessTemplate?: TemplateRef<{
    $implicit: TemplateRef<void>;
    status: string;
    index: number;
  }>; // Set by parent.
  direction = 'horizontal';
  index = 0;
  last = false;
  outStatus = 'process';
  showProcessDot = false;
  clickable = false;
  click$ = new Subject<number>();

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status =
        current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
    }
  }

  private _currentIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onClick(): void {
    if (this.clickable && this.currentIndex !== this.index && !this.vtsDisabled) {
      this.click$.next(this.index);
    }
  }

  enable(): void {
    this.vtsDisabled = false;
    this.cdr.markForCheck();
  }

  disable(): void {
    this.vtsDisabled = true;
    this.cdr.markForCheck();
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.click$.complete();
  }
}
