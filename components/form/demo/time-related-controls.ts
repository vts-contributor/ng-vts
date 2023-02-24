import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'vts-demo-form-time-related-controls',
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>DatePicker</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-date-picker formControlName="datePicker"></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>DatePicker[ShowTime]</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-date-picker vtsShowTime formControlName="datePickerTime"></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>MonthPicker</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-date-picker vtsMode="month" formControlName="monthPicker"></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>RangePicker</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-range-picker formControlName="rangePicker"></vts-range-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>RangePicker[showTime]</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-range-picker vtsShowTime formControlName="rangePickerTime"></vts-range-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSm]="8" [vtsXs]="24" vtsRequired>TimePicker</vts-form-label>
        <vts-form-control [vtsSm]="16" [vtsXs]="24">
          <vts-time-picker formControlName="timePicker"></vts-time-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-control [vtsXs]="{ span: 24, offset: 0 }" [vtsSm]="{ span: 16, offset: 8 }">
          <button vts-button vtsType="primary">Submit</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      form {
        max-width: 600px;
      }
    `
  ]
})
export class VtsDemoFormTimeRelatedControlsComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log(this.validateForm.value);
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      datePicker: [null],
      datePickerTime: [null],
      monthPicker: [null],
      rangePicker: [[]],
      rangePickerTime: [[]],
      timePicker: [null]
    });
  }
}
