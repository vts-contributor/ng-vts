import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'vts-demo-form-auto-tips',
  template: `
    <form
      vts-form
      [vtsAutoTips]="autoTips"
      [formGroup]="validateForm"
      (ngSubmit)="submitForm(validateForm.value)"
    >
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Username</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidatingTip="Validating...">
          <input
            vts-input
            formControlName="userName"
            placeholder="async validate try to write JasonWood"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Mobile</vts-form-label>
        <vts-form-control [vtsSpan]="12">
          <input vts-input formControlName="mobile" placeholder="mobile" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>E-mail</vts-form-label>
        <vts-form-control [vtsSpan]="12">
          <input vts-input formControlName="email" placeholder="email" type="email" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Password</vts-form-label>
        <vts-form-control
          [vtsSpan]="12"
          vtsDisableAutoTips
          vtsErrorTip="Please input your password!"
        >
          <input
            vts-input
            type="password"
            formControlName="password"
            (ngModelChange)="validateConfirmPassword()"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Confirm Password</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsDisableAutoTips [vtsErrorTip]="passwordErrorTpl">
          <input
            vts-input
            type="password"
            formControlName="confirm"
            placeholder="confirm your password"
          />
          <ng-template #passwordErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="control.hasError('confirm')">
              Password is inconsistent!
            </ng-container>
          </ng-template>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsOffset]="7" [vtsSpan]="12">
          <button vts-button vtsType="primary">Submit</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      [vts-form] {
        max-width: 600px;
      }
    `
  ]
})
export class VtsDemoFormAutoTipsComponent {
  validateForm: UntypedFormGroup;

  // current locale is key of the vtsAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项'
    },
    en: {
      required: 'Input is required'
    },
    default: {
      email: '邮箱格式不正确/The input is not valid email'
    }
  };

  submitForm(value: {
    userName: string;
    email: string;
    password: string;
    confirm: string;
    comment: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: {
              'zh-cn': `用户名已存在`,
              en: `The username is redundant!`
            }
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: UntypedFormBuilder) {
    // use `MyValidators`
    const { required, maxLength, minLength, email, mobile } = MyValidators;
    this.validateForm = this.fb.group({
      userName: ['', [required, maxLength(12), minLength(6)], [this.userNameAsyncValidator]],
      mobile: ['', [required, mobile]],
      email: ['', [required, email]],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]]
    });
  }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, VtsSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`
        }
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`
        }
      };
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
          mobile: {
            'zh-cn': `手机号码格式不正确`,
            en: `Mobile phone number is not valid`
          }
        };
  }
}

function isEmptyInputValue(value: VtsSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
