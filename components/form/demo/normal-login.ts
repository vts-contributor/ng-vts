import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-normal-login',
  template: `
    <form vts-form [formGroup]="validateForm" class="login-form" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-control vtsErrorTip="Please input your username!">
          <vts-input-group vtsPrefixIcon="user">
            <input type="text" vts-input formControlName="userName" placeholder="Username" />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control vtsErrorTip="Please input your Password!">
          <vts-input-group vtsPrefixIcon="lock">
            <input type="password" vts-input formControlName="password" placeholder="Password" />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <div vts-row class="login-form-margin">
        <div vts-col [vtsSpan]="12">
          <label vts-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
        </div>
        <div vts-col [vtsSpan]="12">
          <a class="login-form-forgot">Forgot password</a>
        </div>
      </div>
      <button vts-button class="login-form-button login-form-margin" [vtsType]="'primary'">
        Log in
      </button>
      Or
      <a>register now!</a>
    </form>
  `,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `
  ]
})
export class VtsDemoFormNormalLoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
