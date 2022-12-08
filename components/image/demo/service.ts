import { Component } from '@angular/core';
import { VtsImageService } from '@ui-vts/ng-vts/image';

@Component({
  selector: 'vts-demo-image-service',
  template: `
    <button vts-button vtsType="primary" (click)="onClick()">Preview</button>
  `
})
export class VtsDemoImageServiceComponent {
  constructor(private vtsImageService: VtsImageService) {}

  onClick(): void {
    const images = [
      {
        src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
        width: '200px',
        height: '200px',
        alt: 'ng-zorro'
      },
      {
        src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
        width: '200px',
        height: '200px',
        alt: 'angular'
      }
    ];
    this.vtsImageService.preview(images, { vtsZoom: 1.5, vtsRotate: 0 });
  }
}
