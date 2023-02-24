import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-layout',
  template: `
    <form
      vts-form
      [vtsLayout]="validateForm.get('formLayout')?.value"
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
      <vts-form-item>
        <vts-form-label [vtsSpan]="isHorizontal ? 4 : null">Form Layout</vts-form-label>
        <vts-form-control [vtsSpan]="isHorizontal ? 14 : null">
          <vts-radio-group formControlName="formLayout">
            <label vts-radio-button [vtsValue]="'horizontal'">Horizontal</label>
            <label vts-radio-button [vtsValue]="'vertical'">Vertical</label>
            <label vts-radio-button [vtsValue]="'inline'">Inline</label>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="isHorizontal ? 4 : null">Field A</vts-form-label>
        <vts-form-control
          [vtsSpan]="isHorizontal ? 14 : null"
          vtsErrorTip="Please input your username!"
        >
          <input vts-input formControlName="fieldA" placeholder="input placeholder" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="isHorizontal ? 4 : null">Field B</vts-form-label>
        <vts-form-control
          [vtsSpan]="isHorizontal ? 14 : null"
          vtsErrorTip="Please input your Password!"
        >
          <input vts-input formControlName="filedB" placeholder="input placeholder" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control
          [vtsSpan]="isHorizontal ? 14 : null"
          [vtsOffset]="isHorizontal ? 4 : null"
        >
          <button vts-button vtsType="primary">Submit</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      [vts-form]:not(.vts-form-inline):not(.vts-form-vertical) {
        max-width: 600px;
      }
    `
  ]
})
export class VtsDemoFormLayoutComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout?.value === 'horizontal';
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      formLayout: ['horizontal'],
      fieldA: [null, [Validators.required]],
      filedB: [null, [Validators.required]]
    });
  }
}
