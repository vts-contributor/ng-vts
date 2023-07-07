import { Component } from '@angular/core';
import { VtsUploadAfterFilterChanges, VtsUploadFile, VtsUploadFilter } from '@ui-vts/ng-vts/upload';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  selector: 'vts-demo-upload-validate',
  template: `
    <vts-upload
      vtsAction="https://testapi.io/api/vtskit/upload"
      (vtsAfterFilter)="handleAfterFilter($event)"
      [vtsSize]="100"
      vtsMultiple
      [vtsLimit]="1"
      vtsFileType="image/png"
      [vtsFilter]="customFilter"
    >
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload
      </button>
    </vts-upload>
    <div>Size below 100kb</div>
    <div>Can't select 2 files at a time</div>
    <div>Type must be pdf</div>
    <div></div>
  `
})
export class VtsDemoUploadValidateComponent {
  customFilter: VtsUploadFilter[] = [
    {
      name: 'custom',
      fn: (fileList: VtsUploadFile[]) => fileList.filter(w => w.name.startsWith('e'))
    }
  ];

  constructor(private toast: VtsToastService) {}

  handleAfterFilter(e: VtsUploadAfterFilterChanges) {
    const { rejected } = e;
    rejected.forEach(file => {
      let msg = 'Unknown';
      switch (file.rejectReason) {
        case 'size':
          msg = `File size must be below 100kB. (${file.name})`;
          break;
        case 'limit':
          msg = `Can't select more than 1 file at a time. (Ignore ${file.name})`;
          break;
        case 'type':
          msg = `File must be in mime type (image/png) (${file.name})`;
          break;
        case 'custom':
          msg = `Filename must be started with "e" (${file.name})`;
          break;
      }

      this.toast.create('error', 'Invalid', msg, {
        vtsTheme: 'fill'
      });
    });
  }
}
