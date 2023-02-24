import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-dynamic-rule',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-label [vtsSpan]="4" vtsRequired vtsFor="name">Name</vts-form-label>
        <vts-form-control [vtsSpan]="8" vtsErrorTip="Please input your name">
          <input
            type="text"
            vts-input
            formControlName="name"
            placeholder="Please input your name"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label
          [vtsSpan]="4"
          vtsFor="nickname"
          [vtsRequired]="validateForm.get('required')?.value"
        >
          Nickname
        </vts-form-label>
        <vts-form-control [vtsSpan]="8" vtsErrorTip="Please input your nickname">
          <input
            type="text"
            vts-input
            formControlName="nickname"
            placeholder="Please input your nickname"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsSpan]="8" [vtsOffset]="4">
          <label vts-checkbox formControlName="required" (ngModelChange)="requiredChange($event)">
            Nickname is required
          </label>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsSpan]="8" [vtsOffset]="4">
          <button vts-button vtsType="primary">Check</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoFormDynamicRuleComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('nickname')!.clearValidators();
      this.validateForm.get('nickname')!.markAsPristine();
    } else {
      this.validateForm.get('nickname')!.setValidators(Validators.required);
      this.validateForm.get('nickname')!.markAsDirty();
    }
    this.validateForm.get('nickname')!.updateValueAndValidity();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null],
      required: [false]
    });
  }
}
