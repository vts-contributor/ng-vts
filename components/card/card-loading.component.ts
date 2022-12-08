/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-card-loading',
  exportAs: 'vtsCardLoading',
  template: `
    <div class="vts-card-loading-content">
      <div
        class="vts-row"
        style="margin-left: -4px; margin-right: -4px;"
        *ngFor="let listOfClassName of listOfLoading"
      >
        <div
          *ngFor="let className of listOfClassName"
          [ngClass]="className"
          style="padding-left: 4px; padding-right: 4px;"
        >
          <div class="vts-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VtsCardLoadingComponent {
  listOfLoading: string[][] = [
    ['vts-col-22'],
    ['vts-col-8', 'vts-col-15'],
    ['vts-col-6', 'vts-col-18'],
    ['vts-col-13', 'vts-col-9'],
    ['vts-col-4', 'vts-col-3', 'vts-col-16'],
    ['vts-col-8', 'vts-col-6', 'vts-col-8']
  ];
  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card-loading-content');
  }
}
