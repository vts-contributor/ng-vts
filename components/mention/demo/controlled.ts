import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { VtsMentionComponent } from '@ui-vts/ng-vts/mention';

@Component({
  selector: 'vts-demo-mention-controlled',
  encapsulation: ViewEncapsulation.None,
  template: `
    <form vts-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <vts-form-item>
        <vts-form-label [vtsSm]="6" vtsFor="mention">Top coders</vts-form-label>
        <vts-form-control [vtsSm]="16" vtsErrorTip="More than one must be selected!">
          <vts-mention #mentions [vtsSuggestions]="suggestions">
            <input
              id="mention"
              placeholder="input here"
              formControlName="mention"
              vtsMentionTrigger
              vts-input
            />
          </vts-mention>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item vts-row style="margin-bottom:8px;">
        <vts-form-control [vtsSpan]="14" [vtsOffset]="6">
          <button type="button" vts-button vtsType="primary" (click)="submitForm()">Submit</button>
          &nbsp;&nbsp;&nbsp;
          <button type="button" vts-button (click)="resetForm()">Reset</button>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoMentionControlledComponent implements OnInit {
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  validateForm!: UntypedFormGroup;
  @ViewChild('mentions', { static: true }) mentionChild!: VtsMentionComponent;

  get mention(): AbstractControl {
    return this.validateForm.get('mention')!;
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mention: ['@afc163 ', [Validators.required, this.mentionValidator]]
    });
  }

  mentionValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.mentionChild.getMentions().length < 2) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    this.mention.markAsDirty();
    this.mention.updateValueAndValidity();
    if (this.mention.valid) {
      console.log('Submit!!!', this.mention.value);
      console.log(this.mentionChild.getMentions());
    } else {
      console.log('Errors in form!!!');
    }
  }

  resetForm(): void {
    this.validateForm?.reset({
      mention: '@afc163 '
    });
  }
}
