/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Host,
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
import {
  AbstractControl,
  FormControlDirective,
  FormControlName,
  NgControl,
  NgModel
} from '@angular/forms';
import { helpMotion } from '@ui-vts/ng-vts/core/animation';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { toBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsI18nService } from '@ui-vts/ng-vts/i18n';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { VtsFormDirective } from './form.directive';

import { VtsFormControlStatusType, VtsFormItemComponent } from './form-item.component';

const iconTypeMap = {
  error: 'Close-fill',
  validating: 'loading',
  success: 'check-circle-fill',
  warning: 'exclamation-circle-fill'
} as const;

@Component({
  selector: 'vts-form-control',
  exportAs: 'vtsFormControl',
  preserveWhitespaces: false,
  animations: [helpMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="vts-form-item-control-input">
      <div class="vts-form-item-control-input-content">
        <ng-content></ng-content>
      </div>
      <span class="vts-form-item-children-icon">
        <i *ngIf="vtsHasFeedback && iconType" vts-icon [vtsType]="iconType"></i>
      </span>
    </div>
    <div [ngClass]="['vts-form-item-explain', 'vts-form-item-explain-' + status]" *ngIf="innerTip">
      <div @helpMotion>
        <ng-container *vtsStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">
          {{ innerTip }}
        </ng-container>
      </div>
    </div>
    <div class="vts-form-item-extra" *ngIf="vtsExtra">
      <ng-container *vtsStringTemplateOutlet="vtsExtra">
        {{ vtsExtra }}
      </ng-container>
    </div>
  `
})
export class VtsFormControlComponent
  implements OnChanges, OnDestroy, OnInit, AfterContentInit, OnDestroy
{
  static ngAcceptInputType_vtsHasFeedback: BooleanInput;
  static ngAcceptInputType_vtsRequired: BooleanInput;
  static ngAcceptInputType_vtsNoColon: BooleanInput;
  static ngAcceptInputType_vtsDisableAutoTips: BooleanInput;

  private _hasFeedback = false;
  private validateChanges: Subscription = Subscription.EMPTY;
  private validateString: string | null = null;
  private destroyed$ = new Subject<void>();
  private localeId!: string;
  private autoErrorTip?: string;

  private get disableAutoTips(): boolean {
    return this.vtsDisableAutoTips !== 'default'
      ? toBoolean(this.vtsDisableAutoTips)
      : this.vtsFormDirective?.vtsDisableAutoTips;
  }

  status: VtsFormControlStatusType = null;
  validateControl: AbstractControl | NgModel | null = null;
  iconType: typeof iconTypeMap[keyof typeof iconTypeMap] | null = null;
  innerTip: string | TemplateRef<{ $implicit: AbstractControl | NgModel }> | null = null;

  @ContentChild(NgControl, { static: false }) defaultValidateControl?:
    | FormControlName
    | FormControlDirective;
  @Input() vtsSuccessTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() vtsWarningTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() vtsErrorTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() vtsValidatingTip?: string | TemplateRef<{ $implicit: AbstractControl | NgModel }>;
  @Input() vtsExtra?: string | TemplateRef<void>;
  @Input() vtsAutoTips: Record<string, Record<string, string>> = {};
  @Input() vtsDisableAutoTips: boolean | 'default' = 'default';

  @Input()
  set vtsHasFeedback(value: boolean) {
    this._hasFeedback = toBoolean(value);
    if (this.vtsFormItemComponent) {
      this.vtsFormItemComponent.setHasFeedback(this._hasFeedback);
    }
  }

  get vtsHasFeedback(): boolean {
    return this._hasFeedback;
  }

  @Input()
  set vtsValidateStatus(value: string | AbstractControl | FormControlName | NgModel) {
    if (value instanceof AbstractControl || value instanceof NgModel) {
      this.validateControl = value;
      this.validateString = null;
      this.watchControl();
    } else if (value instanceof FormControlName) {
      this.validateControl = value.control;
      this.validateString = null;
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.setStatus();
    }
  }

  private watchControl(): void {
    this.validateChanges.unsubscribe();
    /** miss detect https://github.com/angular/angular/issues/10887 **/
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = (this.validateControl.statusChanges as Observable<VtsSafeAny>)
        .pipe(startWith(null), takeUntil(this.destroyed$))
        .subscribe(_ => {
          if (!this.disableAutoTips) {
            this.updateAutoErrorTip();
          }
          this.setStatus();
          this.cdr.markForCheck();
        });
    }
  }

  private setStatus(): void {
    this.status = this.getControlStatus(this.validateString);
    this.iconType = this.status ? iconTypeMap[this.status] : null;
    this.innerTip = this.getInnerTip(this.status);
    if (this.vtsFormItemComponent) {
      this.vtsFormItemComponent.setWithHelpViaTips(!!this.innerTip);
      this.vtsFormItemComponent.setStatus(this.status);
    }
  }

  private getControlStatus(validateString: string | null): VtsFormControlStatusType {
    let status: VtsFormControlStatusType;

    if (validateString === 'warning' || this.validateControlStatus('INVALID', 'warning')) {
      status = 'warning';
    } else if (validateString === 'error' || this.validateControlStatus('INVALID')) {
      status = 'error';
    } else if (
      validateString === 'validating' ||
      validateString === 'pending' ||
      this.validateControlStatus('PENDING')
    ) {
      status = 'validating';
    } else if (validateString === 'success' || this.validateControlStatus('VALID')) {
      status = 'success';
    } else {
      status = null;
    }

    return status;
  }

  private validateControlStatus(
    validStatus: string,
    statusType?: VtsFormControlStatusType
  ): boolean {
    if (!this.validateControl) {
      return false;
    } else {
      const { dirty, touched, status } = this.validateControl;
      return (
        (!!dirty || !!touched) &&
        (statusType ? this.validateControl.hasError(statusType) : status === validStatus)
      );
    }
  }

  private getInnerTip(
    status: VtsFormControlStatusType
  ): string | TemplateRef<{ $implicit: AbstractControl | NgModel }> | null {
    switch (status) {
      case 'error':
        return (!this.disableAutoTips && this.autoErrorTip) || this.vtsErrorTip || null;
      case 'validating':
        return this.vtsValidatingTip || null;
      case 'success':
        return this.vtsSuccessTip || null;
      case 'warning':
        return this.vtsWarningTip || null;
      default:
        return null;
    }
  }

  private updateAutoErrorTip(): void {
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = '';
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip =
            errors[key]?.[this.localeId] ??
            this.vtsAutoTips?.[this.localeId]?.[key] ??
            this.vtsAutoTips.default?.[key] ??
            this.vtsFormDirective?.vtsAutoTips?.[this.localeId]?.[key] ??
            this.vtsFormDirective?.vtsAutoTips.default?.[key];
        }
        if (!!autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }

  private subscribeAutoTips(observable: Observable<VtsSafeAny>): void {
    observable?.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      if (!this.disableAutoTips) {
        this.updateAutoErrorTip();
        this.setStatus();
        this.cdr.markForCheck();
      }
    });
  }

  constructor(
    elementRef: ElementRef,
    @Optional() @Host() private vtsFormItemComponent: VtsFormItemComponent,
    private cdr: ChangeDetectorRef,
    renderer: Renderer2,
    i18n: VtsI18nService,
    @Optional() private vtsFormDirective: VtsFormDirective
  ) {
    renderer.addClass(elementRef.nativeElement, 'vts-form-item-control');

    this.subscribeAutoTips(i18n.localeChange.pipe(tap(locale => (this.localeId = locale.locale))));
    this.subscribeAutoTips(this.vtsFormDirective?.getInputObservable('vtsAutoTips'));
    this.subscribeAutoTips(
      this.vtsFormDirective
        ?.getInputObservable('vtsDisableAutoTips')
        .pipe(filter(() => this.vtsDisableAutoTips === 'default'))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsDisableAutoTips,
      vtsAutoTips,
      vtsSuccessTip,
      vtsWarningTip,
      vtsErrorTip,
      vtsValidatingTip
    } = changes;

    if (vtsDisableAutoTips || vtsAutoTips) {
      this.updateAutoErrorTip();
      this.setStatus();
    } else if (vtsSuccessTip || vtsWarningTip || vtsErrorTip || vtsValidatingTip) {
      this.setStatus();
    }
  }

  ngOnInit(): void {
    this.setStatus();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterContentInit(): void {
    if (!this.validateControl && !this.validateString) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.vtsValidateStatus = this.defaultValidateControl.control;
      } else {
        this.vtsValidateStatus = this.defaultValidateControl!;
      }
    }
  }
}
