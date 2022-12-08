import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-empty-customize',
  template: `
    <vts-empty
      vtsNotFoundImage="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      [vtsNoResult]="contentTpl"
      [vtsNotFoundFooter]="footerTpl"
    >
      <ng-template #contentTpl>
        <span>
          Customize
          <a href="#API">Description</a>
        </span>
      </ng-template>
      <ng-template #footerTpl>
        <button vts-button vtsType="primary" (click)="onClick()">Create Now</button>
      </ng-template>
    </vts-empty>
  `
})
export class VtsDemoEmptyCustomizeComponent {
  onClick(): void {
    console.log('clicked');
  }
}
