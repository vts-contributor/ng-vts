import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-upload-preview-file',
  template: `
    <div class="clearfix">
      <vts-upload
        vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        vtsListType="picture"
        [vtsPreviewFile]="previewFile"
      >
        <button vts-button>
          <i vts-icon vtsType="UploadCloud"></i>
          Upload
        </button>
      </vts-upload>
    </div>
  `
})
export class VtsDemoUploadPreviewFileComponent {
  constructor(private http: HttpClient) {}

  previewFile = (file: VtsUploadFile) => {
    console.log('Your upload file:', file);
    return this.http
      .post<{ thumbnail: string }>(`https://next.json-generator.com/api/json/get/4ytyBoLK8`, {
        method: 'POST',
        body: file
      })
      .pipe(map(res => res.thumbnail));
  };
}
