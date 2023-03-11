import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-select-multiple',
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
            [vtsMaxTagCount]="4"
            vtsMode="multiple"
            name="select1"
            [vtsPlaceHolder]="placeholder"
            [vtsSize]="size"
            vtsShowSearch
            vtsAllowClear
            [(ngModel)]="value"
          >
            <vts-option
              *ngFor="let option of listOfOption"
              [vtsValue]="option.value"
              [vtsLabel]="option.label"
            ></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label Name</vts-form-label>
        <vts-form-control>
          <vts-select
            vtsDisabled="true"
            vtsMode="multiple"
            name="select2"
            [vtsPlaceHolder]="placeholder"
            [vtsSize]="size"
            vtsShowSearch
            vtsAllowClear
            [(ngModel)]="value"
          >
            <vts-option
              *ngFor="let option of listOfOption"
              [vtsValue]="option.value"
              [vtsLabel]="option.label"
            ></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Label Name</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-select
                vtsMode="multiple"
                formControlName="inputValue"
                [vtsPlaceHolder]="placeholder"
                [vtsSize]="size"
                vtsShowSearch
                vtsAllowClear
              >
                <vts-option
                  *ngFor="let option of listOfOption"
                  [vtsValue]="option.value"
                  [vtsLabel]="option.label"
                ></vts-option>
              </vts-select>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `,
  styles: []
})
export class VtsDemoSelectMultipleComponent {
  value = ['option1', 'option5'];
  placeholder = '';
  size: any = 'md';
  listOfOption: Array<{ label: string; value: string }> = [];

  formGroup = new UntypedFormGroup({
    inputValue: new UntypedFormControl([], [Validators.minLength(5)])
  });

  ngOnInit() {
    for (let i = 1; i < 9; i++) {
      this.listOfOption.push({ label: `Option ${i}`, value: `option${i}` });
    }
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

    this.formGroup.get('inputValue')?.setValue(['option1', 'option5']);
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}
