import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  formGroup: FormGroup = new FormGroup({
    checkboxes: new FormGroup({
      A: new FormControl(false),
      B: new FormControl(false)
    })
  });

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(e => this.print(e));
  }

  print(value: object) {
    console.log(value);
  }
}
