import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-input-helptext',
  template: `
    <vts-radio-group [(ngModel)]="size" (ngModelChange)="setValue($event)">
      <label vts-radio-button vtsValue="xl">XL</label>
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />

    <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-form-control vtsExtra="Help text is displayed here, up to 2 lines">
          <input vts-input [vtsSize]="size" [placeholder]="value" formControlName="inputValue" />
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoInputHelptextComponent implements OnInit {
  value?: string;
  size: VtsSizeXLMSType = 'md';

  formGroup: UntypedFormGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('')
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
