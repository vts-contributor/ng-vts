import { Component } from '@angular/core';
import { VtsUploadFile } from '@ui-vts/ng-vts/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'vts-demo-upload-transform-file',
  template: `
    <vts-upload
      vtsAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      [vtsTransformFile]="transformFile"
    >
      <button vts-button>
        <i vts-icon vtsType="UploadCloud"></i>
        Upload
      </button>
    </vts-upload>
  `
})
export class VtsDemoUploadTransformFileComponent {
  transformFile = (file: VtsUploadFile) => {
    return new Observable((observer: Observer<Blob>) => {
      const reader = new FileReader();
      // tslint:disable-next-line:no-any
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob(blob => {
            observer.next(blob!);
            observer.complete();
          });
        };
      };
    });
  };
}
