import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'vts-demo-form-dynamic-form-item',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item *ngFor="let control of listOfControl; let i = index">
        <vts-form-label [vtsXs]="24" [vtsSm]="4" *ngIf="i == 0" [vtsFor]="control.controlInstance">
          Passengers
        </vts-form-label>
        <vts-form-control
          [vtsXs]="24"
          [vtsSm]="20"
          [vtsOffset]="i == 0 ? 0 : 4"
          vtsErrorTip="Please input passenger's name or delete this field."
        >
          <input
            class="passenger-input"
            vts-input
            placeholder="placeholder"
            [attr.id]="control.id"
            [formControlName]="control.controlInstance"
          />
          <i
            vts-icon
            vtsType="minus-circle-o"
            class="dynamic-delete-button"
            (click)="removeField(control, $event)"
          ></i>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsXs]="{ span: 24, offset: 0 }" [vtsSm]="{ span: 20, offset: 4 }">
          <button vts-button vtsType="default" class="add-button" (click)="addField($event)">
            <i vts-icon vtsType="plus"></i>
            Add field
          </button>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsXs]="{ span: 24, offset: 0 }" [vtsSm]="{ span: 20, offset: 4 }">
          <button vts-button vtsType="primary">Submit</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,

  styles: [
    `
      .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
      }

      .dynamic-delete-button:hover {
        color: #777;
      }

      .passenger-input {
        width: 60%;
        margin-right: 8px;
      }

      [vts-form] {
        max-width: 600px;
      }

      .add-button {
        width: 60%;
      }
    `
  ]
})
export class VtsDemoFormDynamicFormItemComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id =
      this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new UntypedFormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}
