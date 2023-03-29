import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-coordinated',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-label [vtsSpan]="5" vtsRequired vtsFor="note">Note</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsErrorTip="Please input your username!">
          <input id="note" type="text" vts-input formControlName="note" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5" vtsFor="gender" vtsRequired>Gender</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsErrorTip="Please select your gender!">
          <vts-select
            id="gender"
            formControlName="gender"
            vtsPlaceHolder="Select a option and change input text above"
            (ngModelChange)="genderChange($event)"
          >
            <vts-option vtsValue="male" vtsLabel="male"></vts-option>
            <vts-option vtsValue="female" vtsLabel="female"></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsSpan]="12" [vtsOffset]="5">
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
export class VtsDemoFormCoordinatedComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  genderChange(value: string): void {
    this.validateForm.get('note')!.setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      note: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }
}
