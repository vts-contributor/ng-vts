import { Component } from '@angular/core';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';

@Component({
  selector: 'vts-demo-upload-default-file-list',
  template: `
    <vts-upload
      vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      [vtsFileList]="fileList"
    >
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadDefaultFileListComponent {
  fileList: VtsUploadFile[] = [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
}
