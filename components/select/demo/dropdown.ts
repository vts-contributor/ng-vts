import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-select-dropdown',
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
        <vts-form-label>Label Name</vts-form-label>
        <vts-form-control>
          <vts-select
            name="select1"
            [vtsPlaceHolder]="placeholder"
            [vtsSize]="size"
            vtsShowSearch
            vtsAllowClear
            [ngModel]="value"
          >
            <vts-option vtsValue="A" vtsLabel="State: normal"></vts-option>
            <vts-option vtsValue="B" vtsLabel="State: hover"></vts-option>
            <vts-option vtsValue="C" vtsLabel="State: selected"></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label Name</vts-form-label>
        <vts-form-control>
          <vts-select
            [vtsDisabled]="true"
            name="select2"
            [vtsPlaceHolder]="placeholder"
            [vtsSize]="size"
            vtsShowSearch
            vtsAllowClear
            [ngModel]="value"
          >
            <vts-option vtsValue="A" vtsLabel="State: normal"></vts-option>
            <vts-option vtsValue="B" vtsLabel="State: hover"></vts-option>
            <vts-option vtsValue="C" vtsLabel="State: selected"></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Label Name</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-select
                formControlName="inputValue"
                [vtsPlaceHolder]="placeholder"
                [vtsSize]="size"
                vtsShowSearch
                vtsAllowClear
              >
                <vts-option vtsValue="A" vtsLabel="State: normal"></vts-option>
                <vts-option vtsValue="B" vtsLabel="State: hover"></vts-option>
                <vts-option vtsValue="C" vtsLabel="State: selected"></vts-option>
              </vts-select>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `,
  styles: []
})
export class VtsDemoSelectDropdownComponent {
  value = 'A';
  placeholder = '';
  size: any = 'md';

  formGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl('A', [Validators.minLength(5)])
  });

  ngOnInit() {
    this.setValue(this.size);
  }

  setValue(e: string) {
    switch (e) {
      case 'sm':
        this.placeholder = 'Small Input';
        break;
      case 'md':
        this.placeholder = 'Medium Input';
        break;
      case 'lg':
        this.placeholder = 'Large Input';
        break;
      case 'xl':
        this.placeholder = 'XLarge Input';
        break;
    }

    this.formGroup.get('inputValue')?.setValue('A');
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}
