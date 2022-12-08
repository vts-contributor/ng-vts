import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-upload-upload-manually',
  template: `
    <vts-upload [(vtsFileList)]="fileList" [vtsBeforeUpload]="beforeUpload">
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Select File
      </button>
    </vts-upload>
    <button
      vts-button
      [vtsType]="'primary'"
      [vtsLoading]="uploading"
      (click)="handleUpload()"
      [disabled]="fileList.length == 0"
      style="margin-top: 16px"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </button>
  `
})
export class VtsDemoUploadUploadManuallyComponent {
  uploading = false;
  fileList: VtsUploadFile[] = [];

  constructor(private http: HttpClient, private msg: VtsMessageService) {}

  beforeUpload = (file: VtsUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest(
      'POST',
      'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      formData,
      {
        // reportProgress: true
      }
    );
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
}
