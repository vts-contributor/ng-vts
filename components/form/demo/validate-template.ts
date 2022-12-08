import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-form-validate-template',
  template: `
    <form vts-form>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Required</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" vtsErrorTip="Input is required">
          <input vts-input [ngModel]="'Required Input'" name="required" required />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">MaxLength</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" vtsErrorTip="MaxLength is 6">
          <input vts-input [ngModel]="'MaxLength is 6'" name="maxlength" maxlength="6" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">MinLength</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" vtsErrorTip="MinLength is 6">
          <input vts-input [ngModel]="'MinLength is 6'" name="minlength" minlength="6" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Email</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" vtsErrorTip="Email is not valid">
          <input vts-input [ngModel]="'Input Email'" name="email" email />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Pattern</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" vtsErrorTip="Pattern not match">
          <input vts-input [ngModel]="'Match pattern'" name="pattern" pattern=".{3,}" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Mix</vts-form-label>
        <vts-form-control vtsHasFeedback [vtsSpan]="12" [vtsErrorTip]="combineTpl">
          <input
            vts-input
            [ngModel]="'MaxLength is 12 and MinLength is 6'"
            name="mix"
            minlength="6"
            maxlength="12"
            required
          />
          <ng-template #combineTpl let-control>
            <ng-container *ngIf="control.hasError('maxlength')">MaxLength is 12</ng-container>
            <ng-container *ngIf="control.hasError('minlength')">MinLength is 6</ng-container>
            <ng-container *ngIf="control.hasError('required')">Input is required</ng-container>
          </ng-template>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      [vts-form] {
        max-width: 600px;
      }
    `
  ]
})
export class VtsDemoFormValidateTemplateComponent {}
