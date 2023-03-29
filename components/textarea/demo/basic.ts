import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'vts-demo-textarea-basic',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-form-control>
          <textarea
            [vtsAutosize]="autoSizeOption"
            placeholder="Textarea placeholder"
            name="input1"
            [(ngModel)]="value"
            vts-input
            [vtsAutosize]="autoSizeOption"
          ></textarea>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-form-control>
          <textarea
            rows="4"
            placeholder="Textarea placeholder"
            disabled
            name="input2"
            [(ngModel)]="value"
            vts-input
          ></textarea>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Input Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <textarea
                rows="4"
                placeholder="Textarea placeholder"
                formControlName="inputValue"
                vts-input
              ></textarea>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoTextareaBasicComponent implements OnInit {
  value?: string = '';
  autoSizeOption = {
    minRows: 4,
    maxRows: 6
  };

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('', {
      validators: [CustomValidator]
    })
  });

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formGroup.get('inputValue')?.setValue(this.value);
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}

function CustomValidator(control: AbstractControl): ValidationErrors | null {
  return { error: !!control };
}
