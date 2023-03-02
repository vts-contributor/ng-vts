import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { VtsFormTooltipIcon } from '@ui-vts/ng-vts/form';

@Component({
  selector: 'vts-demo-form-register',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-label [vtsSm]="6" [vtsXs]="24" vtsRequired vtsFor="email">E-mail</vts-form-label>
        <vts-form-control [vtsSm]="14" [vtsXs]="24" vtsErrorTip="The input is not valid E-mail!">
          <input vts-input formControlName="email" id="email" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="6" [vtsXs]="24" vtsFor="password" vtsRequired>
          Password
        </vts-form-label>
        <vts-form-control [vtsSm]="14" [vtsXs]="24" vtsErrorTip="Please input your password!">
          <input
            vts-input
            type="password"
            id="password"
            formControlName="password"
            (ngModelChange)="updateConfirmValidator()"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="6" [vtsXs]="24" vtsFor="checkPassword" vtsRequired>
          Confirm Password
        </vts-form-label>
        <vts-form-control [vtsSm]="14" [vtsXs]="24" [vtsErrorTip]="errorTpl">
          <input vts-input type="password" formControlName="checkPassword" id="checkPassword" />
          <ng-template #errorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="control.hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </ng-template>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label
          [vtsSm]="6"
          [vtsXs]="24"
          vtsFor="nickname"
          vtsRequired
          vtsTooltipTitle="What do you want other to call you"
        >
          <span>Nickname</span>
        </vts-form-label>
        <vts-form-control [vtsSm]="14" [vtsXs]="24" vtsErrorTip="Please input your nickname!">
          <input vts-input id="nickname" formControlName="nickname" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="6" [vtsXs]="24" vtsFor="phoneNumber" vtsRequired>
          Phone Number
        </vts-form-label>
        <vts-form-control
          [vtsSm]="14"
          [vtsXs]="24"
          [vtsValidateStatus]="validateForm.controls['phoneNumber']"
          vtsErrorTip="Please input your phone number!"
        >
          <vts-input-group [vtsAddOnBefore]="addOnBeforeTemplate">
            <ng-template #addOnBeforeTemplate>
              <vts-select formControlName="phoneNumberPrefix" class="phone-select">
                <vts-option vtsLabel="+86" vtsValue="+86"></vts-option>
                <vts-option vtsLabel="+87" vtsValue="+87"></vts-option>
              </vts-select>
            </ng-template>
            <input formControlName="phoneNumber" id="'phoneNumber'" vts-input />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="6" [vtsXs]="24" vtsFor="website" vtsRequired>
          Website
        </vts-form-label>
        <vts-form-control [vtsSm]="14" [vtsXs]="24" vtsErrorTip="Please input website!">
          <input vts-input id="website" formControlName="website" placeholder="website" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label
          [vtsSm]="6"
          [vtsXs]="24"
          vtsFor="captcha"
          vtsRequired
          vtsTooltipTitle="Please click 'Get captcha'"
          [vtsTooltipIcon]="captchaTooltipIcon"
        >
          Captcha
        </vts-form-label>
        <vts-form-control
          [vtsSm]="14"
          [vtsXs]="24"
          vtsErrorTip="Please input the captcha you got!"
          vtsExtra="We must make sure that your are a human."
        >
          <div vts-row [vtsGutter]="8">
            <div vts-col [vtsSpan]="12">
              <input vts-input formControlName="captcha" id="captcha" />
            </div>
            <div vts-col [vtsSpan]="12">
              <button vts-button (click)="getCaptcha($event)">Get captcha</button>
            </div>
          </div>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item vts-row class="register-area">
        <vts-form-control [vtsSpan]="14" [vtsOffset]="6">
          <label vts-checkbox formControlName="agree">
            <span>
              I have read the
              <a>agreement</a>
            </span>
          </label>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item vts-row class="register-area">
        <vts-form-control [vtsSpan]="14" [vtsOffset]="6">
          <button vts-button vtsType="primary">Register</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,

  styles: [
    `
      [vts-form] {
        max-width: 600px;
      }

      .phone-select {
        width: 70px;
      }

      .register-are {
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoFormRegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: VtsFormTooltipIcon = {
    type: 'InfoOutline',
    theme: 'all'
  };

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      agree: [false]
    });
  }
}
