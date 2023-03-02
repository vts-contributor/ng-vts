import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'vts-demo-checkbox-basic',
  template: `
    <form [vtsLayout]="'horizontal'" vts-form [formGroup]="formGroup">
      <vts-form-item formGroupName="checkboxes">
        <vts-form-label>No Label</vts-form-label>
        <vts-form-control>
          <label formControlName="A" name="checkbox1" vts-checkbox></label>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item formGroupName="checkboxes">
        <vts-form-label>Plus Label</vts-form-label>
        <vts-form-control>
          <label formControlName="B" name="checkbox2" vts-checkbox>Checkbox</label>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoCheckboxBasicComponent {
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    checkboxes: new UntypedFormGroup({
      A: new UntypedFormControl(false),
      B: new UntypedFormControl(false)
    })
  });

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(e => this.print(e));
  }

  print(value: object) {
    console.log(value);
  }
}
