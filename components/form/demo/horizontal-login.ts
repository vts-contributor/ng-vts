import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-horizontal-login',
  template: `
    <form vts-form [vtsLayout]="'inline'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-control vtsErrorTip="Please input your username!">
          <vts-input-group vtsPrefixIcon="user">
            <input formControlName="userName" vts-input placeholder="Username" />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control vtsErrorTip="Please input your Password!">
          <vts-input-group vtsPrefixIcon="lock">
            <input formControlName="password" vts-input type="password" placeholder="Password" />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control>
          <button vts-button vtsType="primary" [disabled]="!validateForm.valid">Log in</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoFormHorizontalLoginComponent implements OnInit {
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
