import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-image-placeholder',
  template: `
    <vts-space [vtsSize]="12">
      <vts-space-item>
        <img vts-image width="200px" height="200px" [vtsSrc]="src" [vtsPlaceholder]="placeholder" />
      </vts-space-item>
      <vts-space-item>
        <button vts-button vtsType="primary" (click)="onReload()">Reload</button>
      </vts-space-item>
    </vts-space>
  `
})
export class VtsDemoImagePlaceholderComponent {
  src = `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`;
  placeholder =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';

  onReload(): void {
    this.src = `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${new Date()}`;
  }
}
