import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-upload-directory',
  template: `
    <vts-upload vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" vtsDirectory>
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload Directory
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadDirectoryComponent {}
