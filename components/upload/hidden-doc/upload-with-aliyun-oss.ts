import { Component } from '@angular/core';
import { VtsUploadChangeParam, VtsUploadFile } from '@ui-vts/ng-vts/upload';

@Component({
  selector: 'vts-demo-upload-upload-with-aliyun-oss',
  template: `
    <vts-upload
      vtsName="file"
      [(vtsFileList)]="files"
      [vtsTransformFile]="transformFile"
      [vtsData]="getExtraData"
      [vtsAction]="mockOSSData.host"
      (vtsChange)="onChange($event)"
    >
      Photos:
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Click to Upload
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadUploadWithAliyunOssComponent {
  files: VtsUploadFile[] = [];
  mockOSSData = {
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw=='
  };

  transformFile = (file: VtsUploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.mockOSSData.dir + filename;

    return file;
  };

  getExtraData = (file: VtsUploadFile) => {
    const { accessId, policy, signature } = this.mockOSSData;

    return {
      key: file.url,
      OSSAccessKeyId: accessId,
      policy: policy,
      Signature: signature
    };
  };

  onChange(e: VtsUploadChangeParam): void {
    console.log('Aliyun OSS:', e.fileList);
  }
}
