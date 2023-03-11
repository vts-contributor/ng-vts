import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'vts-demo-radio-state',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio1" [(ngModel)]="radioValue">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label *vtsSpaceItem vts-radio vtsValue="A">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="B">Radio button item</label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio2" [(ngModel)]="radioValue">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label [vtsDisabled]="disabled" *vtsSpaceItem vts-radio vtsValue="A">
                Radio button item
              </label>
              <label [vtsDisabled]="disabled" *vtsSpaceItem vts-radio vtsValue="B">
                Radio button item
              </label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-radio-group formControlName="inputValue">
                <vts-space vtsPreset="2" vtsDirection="vertical">
                  <label vts-radio *vtsSpaceItem vtsValue="A">Radio button item</label>
                  <label vts-radio *vtsSpaceItem vtsValue="B">Radio button item</label>
                </vts-space>
              </vts-radio-group>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoRadioStateComponent {
  radioValue: string = 'A';
  disabled = true;

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('A', {
      validators: [CustomValidator]
    })
  });

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formGroup.get('inputValue')?.setValue('A');
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}

function CustomValidator(control: AbstractControl): ValidationErrors | null {
  return { error: !!control };
}
