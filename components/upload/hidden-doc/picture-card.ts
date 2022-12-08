import { Component } from '@angular/core';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'vts-demo-upload-picture-card',
  template: `
    <div class="clearfix">
      <vts-upload
        vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        vtsListType="picture-card"
        [(vtsFileList)]="fileList"
        [vtsShowButton]="fileList.length < 8"
        [vtsPreview]="handlePreview"
      >
        <div>
          <i vts-icon vtsType="plus"></i>
          <div style="margin-top: 8px">Upload</div>
        </div>
      </vts-upload>
      <vts-modal
        [vtsVisible]="previewVisible"
        [vtsContent]="modalContent"
        [vtsFooter]="null"
        (vtsOnCancel)="previewVisible = false"
      >
        <ng-template #modalContent>
          <img [src]="previewImage" [ngStyle]="{ width: '100%' }" />
        </ng-template>
      </vts-modal>
    </div>
  `
})
export class VtsDemoUploadPictureCardComponent {
  fileList: VtsUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: VtsUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
}
