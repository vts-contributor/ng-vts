import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-date-picker-basic',
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
          <vts-date-picker
            vtsPlaceHolder="DD/MM/YYYY"
            [vtsSize]="size"
            name="date"
            [ngModel]="value"
            (ngModelChange)="print($event)"
          ></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Time Label</vts-form-label>
        <vts-form-control>
          <vts-date-picker
            vtsPlaceHolder="DD/MM/YYYY"
            [vtsSize]="size"
            name="date2"
            [ngModel]="value"
            (ngModelChange)="print($event)"
            disabled
          ></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Time Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-date-picker
                vtsPlaceHolder="DD/MM/YYYY"
                [vtsSize]="size"
                formControlName="inputValue"
              ></vts-date-picker>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `,
  styles: []
})
export class VtsDemoDatePickerBasicComponent {
  value: Date | null = null;
  size: VtsSizeXLMSType = 'md';

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('', {
      validators: [Validators.pattern('dd-MM-yyyy')]
    })
  });

  ngOnInit() {
    this.setValue();
  }

  setValue() {
    this.formGroup.get('inputValue')?.setValue(new Date());
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  print(e: Date) {
    this.value = e;
    console.log(e);
  }
}
