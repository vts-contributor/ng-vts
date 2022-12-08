import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-complex',
  template: `
    <vts-skeleton [vtsAvatar]="true" [vtsParagraph]="{ rows: 4 }"></vts-skeleton>
  `
})
export class VtsDemoSkeletonComplexComponent {}
