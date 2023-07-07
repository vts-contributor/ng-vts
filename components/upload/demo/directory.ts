import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-upload-directory',
  template: `
    <vts-upload vtsAction="https://testapi.io/api/vtskit/upload" vtsDirectory>
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload Directory
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadDirectoryComponent {}
