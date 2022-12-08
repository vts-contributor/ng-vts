/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBadgeMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-badge-sup',
  exportAs: 'vtsBadgeSup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [zoomBadgeMotion],
  template: `
    <ng-container *ngIf="count <= vtsOverflowCount; else overflowTemplate">
      <span
        *ngFor="let n of maxNumberArray; let i = index"
        class="vts-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!vtsDot && countArray[i] !== undefined">
          <p
            *ngFor="let p of countSingleArray"
            class="vts-scroll-number-only-unit"
            [class.current]="p === countArray[i]"
          >
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ vtsOverflowCount }}+</ng-template>
  `,
  host: {
    '[@.disabled]': `disableAnimation`,
    '[@zoomBadgeMotion]': '',
    '[attr.title]': `vtsTitle === null ? '' : vtsTitle || vtsCount`,
    '[style]': `vtsStyle`,
    '[style.right.px]': `vtsOffset && vtsOffset[0] ? -vtsOffset[0] : null`,
    '[style.margin-top.px]': `vtsOffset && vtsOffset[1] ? vtsOffset[1] : null`,
    '[class.vts-badge-count]': `!vtsDot`,
    '[class.vts-badge-dot]': `vtsDot`,
    '[class.vts-badge-multiple-words]': `countArray.length >= 2`
  }
})
export class VtsBadgeSupComponent implements OnInit, OnChanges {
  @Input() vtsOffset?: [number, number];
  @Input() vtsTitle?: string | null | undefined;
  @Input() vtsStyle: { [key: string]: string } | null = null;
  @Input() vtsDot = false;
  @Input() vtsOverflowCount: number = 99;
  @Input() disableAnimation = false;
  @Input() vtsCount?: number | TemplateRef<VtsSafeAny>;
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  count: number = 0;
  countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-scroll-number');
  }

  generateMaxNumberArray(): void {
    this.maxNumberArray = this.vtsOverflowCount.toString().split('');
  }

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsOverflowCount, vtsCount } = changes;
    if (vtsCount && typeof vtsCount.currentValue === 'number') {
      this.count = Math.max(0, vtsCount.currentValue);
      this.countArray = this.count
        .toString()
        .split('')
        .map(item => +item);
    }
    if (vtsOverflowCount) {
      this.generateMaxNumberArray();
    }
  }
}
