/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { VtsSpaceDirection } from './types';

/**
 * @deprecated VtsSpaceItemLegacyComponent will be removed on 12.0.0.
 * @breaking-change 12.0.0
 */
@Component({
  selector: 'vts-space-item, [vts-space-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'vts-space-item'
  }
})
export class VtsSpaceItemLegacyComponent implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  setDirectionAndSize(direction: VtsSpaceDirection, size: number): void {
    if (direction === 'horizontal') {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-bottom');
      this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `${size}px`);
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-right');
      this.renderer.setStyle(this.elementRef.nativeElement, 'margin-bottom', `${size}px`);
    }
  }

  ngOnInit(): void {}
}
