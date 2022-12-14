import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vts-demo-input-textarea-with-character-count',
  template: `
    <form vts-form [formGroup]="form" vtsLayout="vertical">
      <vts-form-item>
        <vts-form-control>
          <vts-textarea-count [vtsMaxCharacterCount]="100">
            <textarea rows="4" formControlName="comment" vts-input></textarea>
          </vts-textarea-count>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoInputTextareaWithCharacterCountComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(100)]]
    });
  }
}
