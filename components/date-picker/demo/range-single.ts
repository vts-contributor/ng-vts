import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors
} from '@angular/forms';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-date-picker-range-single',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="xl">XL</label>
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Time Label</vts-form-label>
        <vts-form-control>
          <vts-range-picker-single
            name="range1"
            [(ngModel)]="value"
            (ngModelChange)="print($event)"
            [vtsSize]="size"
            [vtsPlaceHolder]="placeholder"
          ></vts-range-picker-single>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Time Label</vts-form-label>
        <vts-form-control>
          <vts-range-picker-single
            disabled
            name="range2"
            [(ngModel)]="value"
            (ngModelChange)="print($event)"
            [vtsSize]="size"
            [vtsPlaceHolder]="placeholder"
          ></vts-range-picker-single>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Time Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-range-picker-single
                [vtsSize]="size"
                [vtsPlaceHolder]="placeholder"
                formControlName="inputValue"
              ></vts-range-picker-single>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `,
  styles: []
})
export class VtsDemoDatePickerRangeSingleComponent {
  value?: Date[];
  size: VtsSizeXLMSType = 'md';
  placeholder: string = 'DD/MM/YYYY - DD/MM/YYYY';

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl(null, {
      validators: [CustomValidator]
    })
  });

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formGroup.get('inputValue')?.setValue([new Date(), new Date()]);
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  print(e: Date[]) {
    this.value = e;
    console.log(e);
  }
}

function CustomValidator(control: AbstractControl): ValidationErrors | null {
  return { error: !!control };
}
