import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'vts-demo-checkbox-state',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label name="checkbox1" *vtsSpaceItem vts-checkbox vtsValue="A1" [ngModel]="true">
                Checkbox
              </label>
              <label name="checkbox2" *vtsSpaceItem vts-checkbox vtsValue="B1">Checkbox</label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label
                name="checkbox3"
                *vtsSpaceItem
                vts-checkbox
                [vtsDisabled]="disabled"
                vtsValue="A2"
                [ngModel]="true"
              >
                Checkbox
              </label>
              <label
                name="checkbox4"
                *vtsSpaceItem
                [vtsDisabled]="disabled"
                vts-checkbox
                vtsValue="B2"
              >
                Checkbox
              </label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item formGroupName="inputGroup">
            <vts-form-label>Label</vts-form-label>
            <vts-form-control [vtsValidateStatus]="formGroup" vtsErrorTip="Error message">
              <vts-checkbox-wrapper>
                <vts-space vtsPreset="2" vtsDirection="vertical">
                  <label formControlName="A" *vtsSpaceItem vts-checkbox vtsValue="A">
                    Checkbox
                  </label>
                  <label formControlName="B" *vtsSpaceItem vts-checkbox vtsValue="B">
                    Checkbox
                  </label>
                </vts-space>
              </vts-checkbox-wrapper>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoCheckboxStateComponent {
  disabled = true;

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputGroup: new UntypedFormGroup(
      {
        A: new UntypedFormControl(false),
        B: new UntypedFormControl(false)
      },
      {
        validators: [CustomValidator]
      }
    )
  });

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formGroup.get('inputGroup')?.get('A')?.setValue(true);
    this.formGroup.get('inputGroup')?.markAllAsTouched();
    this.formGroup.get('inputGroup')?.updateValueAndValidity();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  print(e: string[]) {
    console.log(e);
  }
}

function CustomValidator(control: AbstractControl): ValidationErrors | null {
  return { error: !!control };
}
