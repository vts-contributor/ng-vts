import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tag-basic',
  template: `
    <vts-tag>Tag 1</vts-tag>
    <vts-tag>
      <a href="https://github.com/NG-ZORRO/ng-zorro-antd">Link</a>
    </vts-tag>
    <vts-tag vtsMode="closeable" (vtsOnClose)="onClose()">Tag 2</vts-tag>
    <vts-tag vtsMode="closeable" (vtsOnClose)="preventDefault($event)">Prevent Default</vts-tag>
  `
})
export class VtsDemoTagBasicComponent {
  onClose(): void {
    console.log('tag was closed.');
  }

  preventDefault(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('tag can not be closed.');
  }
}
