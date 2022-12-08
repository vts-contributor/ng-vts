import { Component } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'vts-demo-upload-avatar',
  template: `
    <vts-upload
      class="avatar-uploader"
      vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      vtsName="avatar"
      vtsListType="picture-card"
      [vtsShowUploadList]="false"
      [vtsBeforeUpload]="beforeUpload"
      (vtsChange)="handleChange($event)"
    >
      <ng-container *ngIf="!avatarUrl">
        <i class="upload-icon" vts-icon [vtsType]="loading ? 'loading' : 'plus'"></i>
        <div class="vts-upload-text">Upload</div>
      </ng-container>
      <img *ngIf="avatarUrl" [src]="avatarUrl" style="width: 100%" />
    </vts-upload>
  `,
  styles: [
    `
      :host ::ng-deep .avatar-uploader > .vts-upload {
        width: 128px;
        height: 128px;
      }
    `
  ]
})
export class VtsDemoUploadAvatarComponent {
  loading = false;
  avatarUrl?: string;

  constructor(private msg: VtsMessageService) {}

  beforeUpload = (file: VtsUploadFile, _fileList: VtsUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: VtsUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
