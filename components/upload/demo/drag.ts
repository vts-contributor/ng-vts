import { Component } from '@angular/core';
import { VtsUploadChangeParam } from '@ui-vts/ng-vts/upload';

@Component({
  selector: 'vts-demo-upload-drag',
  template: `
    <vts-upload
      vtsType="drag"
      vtsAccept=".png, .jpg, .jpeg, .svg"
      [vtsMultiple]="true"
      [vtsOpenFileDialogOnClick]="false"
      vtsAction="http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/"
      (vtsChange)="handleChange($event)"
      #container
    >
      <p class="vts-upload-drag-icon">
        <i vts-icon vtsType="UploadCloud"></i>
      </p>
      <p class="text-hint">
        Kéo thả ảnh/video hoặc
        <a vts-button vtsType="link" (click)="container.openDialog()">Chọn file</a>
        để tải lên
      </p>
      <p class="text-hint">
        Chỉ cho phép file dạng .png, .jpg, .jpeg, .svg và dung lượng không quá 1Mb
      </p>
    </vts-upload>
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
export class VtsDemoUploadDragComponent {
  constructor() {}

  handleChange({ file }: VtsUploadChangeParam): void {
    console.log(file);
  }
}
