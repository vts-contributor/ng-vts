import { Component } from '@angular/core';
import { VtsUploadChangeParam, VtsUploadFile } from '@ui-vts/ng-vts/upload';

@Component({
  selector: 'vts-demo-upload-file-list',
  template: `
    <vts-upload
      vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      [vtsFileList]="fileList"
      (vtsChange)="handleChange($event)"
    >
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadFileListComponent {
  fileList: VtsUploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png'
    }
  ];

  handleChange(info: VtsUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}
