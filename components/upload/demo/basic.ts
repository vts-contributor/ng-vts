import { Component } from '@angular/core';
import { VtsUploadChangeParam } from '@ui-vts/ng-vts/upload';

@Component({
  selector: 'vts-demo-upload-basic',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Upload file</vts-form-label>
        <vts-form-control>
          <vts-upload
            #container
            vtsBlock
            vtsAccept=".png, .jpg, .pdf"
            [vtsMultiple]="true"
            vtsAction="https://testapi.io/api/vtskit/upload"
            [vtsOpenFileDialogOnClick]="false"
            (vtsChange)="handleChange($event)"
          >
            <div class="container" vts-row>
              <input
                (click)="container.openDialog()"
                [(ngModel)]="inputValue"
                vts-col
                vts-input
                name="input"
                vtsFlex="1"
              />
              <button
                (click)="container.openDialog()"
                style="width:100px; margin-left: -1px"
                vts-button
              >
                Browser
              </button>
            </div>
            <div style="margin-top: 8px" class="text-hint">Format: png, jpg, pdf</div>
            <div class="text-hint">Max size: 100Mb</div>
          </vts-upload>
        </vts-form-control>
      </vts-form-item>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `
  ]
})
export class VtsDemoUploadBasicComponent {
  inputValue: string = '';

  handleChange(info: VtsUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      this.inputValue = `Uploading ${info.file.name}`;
    }
    if (info.file.status === 'done') {
      this.inputValue = `Upload ${info.file.name} successfully`;
    } else if (info.file.status === 'error') {
      this.inputValue = `Upload ${info.file.name} failed`;
    } else if (info.file.status === 'removed') {
      this.inputValue = `Removed ${info.file.name}`;
    }
  }
}
