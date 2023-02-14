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
        src: 'https://picsum.photos/1000/500?v=9',
        alt: 'example1'
      },
      {
        src: 'https://picsum.photos/1000/500?v=10',
        alt: 'example-2'
      }
    ];
    this.vtsImageService.preview(images, { vtsZoom: 1.0, vtsRotate: 0 });
  }
}
