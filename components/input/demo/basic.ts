import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-input-basic',
  template: `
    <vts-radio-group [(ngModel)]="size" (ngModelChange)="setValue($event)">
      <label vts-radio-button vtsValue="xl">XL</label>
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-form-control>
          <input
            vts-input
            name="input"
            [vtsSize]="size"
            [placeholder]="value"
            [(ngModel)]="value"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-form-control>
          <input
            vts-input
            name="inputDisable"
            [vtsSize]="size"
            [placeholder]="value"
            [(ngModel)]="value"
            [disabled]="true"
          />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Input Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <input
                vts-input
                [vtsSize]="size"
                [placeholder]="value"
                formControlName="inputValue"
              />
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoInputBasicComponent implements OnInit {
  value?: string;
  size: VtsSizeXLMSType = 'md';

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('', {
      validators: [Validators.minLength(16)]
    })
  });

  ngOnInit() {
    this.setValue(this.size);
  }

  setValue(e: string) {
    switch (e) {
      case 'sm':
        this.value = 'Small Input';
        break;
      case 'md':
        this.value = 'Medium Input';
        break;
      case 'lg':
        this.value = 'Large Input';
        break;
      case 'xl':
        this.value = 'XLarge Input';
        break;
    }

    this.formGroup.get('inputValue')?.setValue(this.value);
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}
