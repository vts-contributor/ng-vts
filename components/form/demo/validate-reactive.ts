import { Component } from '@angular/core';

import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'vts-demo-form-validate-reactive',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm(validateForm.value)">
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Username</vts-form-label>
        <vts-form-control
          [vtsSpan]="12"
          vtsHasFeedback
          vtsValidatingTip="Validating..."
          [vtsErrorTip]="userErrorTpl"
        >
          <input
            vts-input
            formControlName="userName"
            placeholder="async validate try to write JasonWood"
          />
          <ng-template #userErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">
              Please input your username!
            </ng-container>
            <ng-container *ngIf="control.hasError('duplicated')">
              The username is redundant!
            </ng-container>
          </ng-template>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>E-mail</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsHasFeedback [vtsErrorTip]="emailErrorTpl">
          <input vts-input formControlName="email" placeholder="email" type="email" />
          <ng-template #emailErrorTpl let-control>
            <ng-container *ngIf="control.hasError('email')">
              The input is not valid E-mail!
            </ng-container>
            <ng-container *ngIf="control.hasError('required')">
              Please input your E-mail!
            </ng-container>
          </ng-template>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="7" vtsRequired>Password</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsHasFeedback vtsErrorTip="Please input your password!">
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
        <vts-form-control [vtsSpan]="12" vtsHasFeedback [vtsErrorTip]="passwordErrorTpl">
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
        <vts-form-label [vtsSpan]="7" vtsRequired>Comment</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsErrorTip="Please write something here!">
          <textarea
            formControlName="comment"
            vts-input
            rows="2"
            placeholder="write any thing"
          ></textarea>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsOffset]="7" [vtsSpan]="12">
          <button vts-button vtsType="primary" [disabled]="!validateForm.valid">Submit</button>
          <button vts-button (click)="resetForm($event)">Reset</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,

  styles: [
    `
      [vts-form] {
        max-width: 600px;
      }

      button {
        margin-left: 8px;
      }
    `
  ]
})
export class VtsDemoFormValidateReactiveComponent {
  validateForm: UntypedFormGroup;

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

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
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
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: ['', [Validators.required]]
    });
  }
}
