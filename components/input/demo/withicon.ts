import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-input-withicon',
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
        <vts-form-control vtsErrorTip="Error message">
          <vts-input-group [vtsSize]="size" [vtsSuffix]="suffixIcon">
            <input vts-input name="input" [placeholder]="value" [(ngModel)]="value" />
          </vts-input-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Input Label</vts-form-label>
        <vts-input-group [vtsSize]="size" [vtsSuffix]="'suffixIcon'">
          <input
            vts-input
            name="inputDisable"
            [placeholder]="value"
            [(ngModel)]="value"
            [disabled]="true"
          />
        </vts-input-group>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Input Label</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-input-group [vtsSize]="size" [vtsSuffix]="suffixIcon">
                <input vts-input [placeholder]="value" formControlName="inputValue" />
              </vts-input-group>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>

    <ng-template #suffixIcon>
      <i style="color: #73777A" vts-icon vtsType="CalendarTodayOutline"></i>
    </ng-template>
  `
})
export class VtsDemoInputWithiconComponent implements OnInit {
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
