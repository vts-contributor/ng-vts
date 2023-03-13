import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-time-picker-basic',
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
          <vts-time-picker
            vtsPlaceHolder="hh:mm:ss"
            name="time1"
            [vtsSize]="size"
            [(ngModel)]="value"
            (ngModelChange)="print($event)"
          ></vts-time-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Time Label</vts-form-label>
        <vts-form-control>
          <vts-time-picker
            vtsPlaceHolder="hh:mm:ss"
            name="time2"
            [vtsSize]="size"
            [(ngModel)]="value"
            (ngModelChange)="print($event)"
            vtsDisabled
          ></vts-time-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Time Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-time-picker
                vtsPlaceHolder="hh:mm:ss"
                [vtsSize]="size"
                formControlName="inputValue"
              ></vts-time-picker>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `,
  styles: []
})
export class VtsDemoTimePickerBasicComponent {
  value: Date | null = null;
  size: VtsSizeLDSType = 'md';

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('', {
      validators: [Validators.pattern('hh:mm:ss')]
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
