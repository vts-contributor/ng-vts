import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-form-validate-static',
  template: `
    <form vts-form>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Fail</vts-form-label>
        <vts-form-control
          vtsValidateStatus="error"
          [vtsSpan]="12"
          vtsErrorTip="Should be combination of numbers & alphabets"
        >
          <input vts-input [ngModel]="'unavailable choice'" name="errorValid" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Warning</vts-form-label>
        <vts-form-control vtsValidateStatus="warning" [vtsSpan]="12">
          <input vts-input [ngModel]="'Warning'" name="warningValid" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Validating</vts-form-label>
        <vts-form-control
          [vtsSpan]="12"
          vtsValidateStatus="validating"
          vtsHasFeedback
          vtsValidatingTip="I'm validating the content"
        >
          <input vts-input [ngModel]="'The content is being validated'" name="validating" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Success</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="success" vtsHasFeedback>
          <input vts-input [ngModel]="'The content'" name="successValid" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Warning</vts-form-label>
        <vts-form-control
          [vtsSpan]="12"
          vtsValidateStatus="warning"
          vtsHasFeedback
          vtsWarningTip="Should be combination of numbers & alphabets"
        >
          <input vts-input [ngModel]="'Warning'" name="warningHighValid" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Fail</vts-form-label>
        <vts-form-control
          [vtsSpan]="12"
          vtsValidateStatus="error"
          vtsHasFeedback
          vtsErrorTip="Should be combination of numbers & alphabets"
        >
          <input vts-input [ngModel]="'unavailable choice'" name="invalidValid" />
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Success</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="success" vtsHasFeedback>
          <vts-date-picker name="date-picker-success"></vts-date-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Warning</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="warning" vtsHasFeedback>
          <vts-time-picker name="time-picker-warning"></vts-time-picker>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Error</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="error" vtsHasFeedback>
          <vts-select name="select-error" [ngModel]="'Option 1'">
            <vts-option vtsValue="Option 1" vtsLabel="Option 1"></vts-option>
            <vts-option vtsValue="Option 2" vtsLabel="Option 2"></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Validating</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="validating" vtsHasFeedback>
          <vts-select name="select-validate" [ngModel]="'Option 2'">
            <vts-option vtsValue="Option 1" vtsLabel="Option 1"></vts-option>
            <vts-option vtsValue="Option 2" vtsLabel="Option 2"></vts-option>
          </vts-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label [vtsSpan]="5">Success</vts-form-label>
        <vts-form-control [vtsSpan]="12" vtsValidateStatus="success" vtsHasFeedback>
          <vts-input-number name="inputnumber-success" style="width:100%"></vts-input-number>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      [vts-form] {
        max-width: 600px;
      }

      vts-date-picker ::ng-deep .vts-calendar-picker {
        width: 100%;
      }

      vts-date-picker,
      vts-time-picker {
        width: 100%;
      }
    `
  ]
})
export class VtsDemoFormValidateStaticComponent {}
