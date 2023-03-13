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
            vtsAccept=".png, .jpg, .pdf"
            [vtsMultiple]="true"
            vtsAction="http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/"
            (vtsChange)="handleChange($event)"
          >
            <div vts-row>
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
            <p style="margin-top: 8px" class="text-hint">Format: png, jpg, pdf</p>
            <p class="text-hint">Max size: 8Mb</p>
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
