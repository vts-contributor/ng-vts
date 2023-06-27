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
  selector: 'vts-demo-upload-gallery',
  template: `
    <div class="clearfix">
      <vts-upload
      [vtsListTitle]="null"
        vtsAction="https://testapi.io/api/vtskit/upload"
        vtsListType="gallery"
        [(vtsFileList)]="fileList"
        [vtsShowButton]="fileList.length < 8"
        [vtsPreview]="handlePreview"
      >
        <button vts-button>
          <i vts-icon vtsType="UploadCloud"></i>
          Upload
        </button>
      </vts-upload>
    </div>
  `,
  styles: [`
    button {
      margin-top: 16px;
    }
  `]
})
export class VtsDemoUploadGalleryComponent {
  fileList: VtsUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://picsum.photos/200/200'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://picsum.photos/200/200'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://picsum.photos/200/200'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://picsum.photos/200/200'
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://picsum.photos/200/200'
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
