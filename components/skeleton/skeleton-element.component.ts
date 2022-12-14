/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  VtsSkeletonAvatarShape,
  VtsSkeletonAvatarSize,
  VtsSkeletonButtonShape,
  VtsSkeletonButtonSize,
  VtsSkeletonInputSize
} from './skeleton.type';

@Directive({
  selector: 'vts-skeleton-element',
  host: {
    '[class.vts-skeleton-active]': 'vtsActive'
  }
})
export class VtsSkeletonElementDirective {
  @Input() vtsActive: boolean = false;
  @Input() vtsType!: 'button' | 'input' | 'avatar' | 'image';

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-skeleton', 'vts-skeleton-element');
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-skeleton-element[vtsType="button"]',
  template: `
    <span
      class="vts-skeleton-button"
      [class.vts-skeleton-button-round]="vtsShape === 'round'"
      [class.vts-skeleton-button-circle]="vtsShape === 'circle'"
      [class.vts-skeleton-button-lg]="vtsSize === 'large'"
      [class.vts-skeleton-button-sm]="vtsSize === 'small'"
    ></span>
  `
})
export class VtsSkeletonElementButtonComponent {
  @Input() vtsShape: VtsSkeletonButtonShape = 'default';
  @Input() vtsSize: VtsSkeletonButtonSize = 'default';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-skeleton-element[vtsType="avatar"]',
  template: `
    <span
      class="vts-skeleton-avatar"
      [class.vts-skeleton-avatar-square]="vtsShape === 'square'"
      [class.vts-skeleton-avatar-circle]="vtsShape === 'circle'"
      [class.vts-skeleton-avatar-lg]="vtsSize === 'large'"
      [class.vts-skeleton-avatar-sm]="vtsSize === 'small'"
      [ngStyle]="styleMap"
    ></span>
  `
})
export class VtsSkeletonElementAvatarComponent implements OnChanges {
  @Input() vtsShape: VtsSkeletonAvatarShape = 'circle';
  @Input() vtsSize: VtsSkeletonAvatarSize = 'default';

  styleMap = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsSize && typeof this.vtsSize === 'number') {
      const sideLength = `${this.vtsSize}px`;
      this.styleMap = {
        width: sideLength,
        height: sideLength,
        'line-height': sideLength
      };
    } else {
      this.styleMap = {};
    }
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-skeleton-element[vtsType="input"]',
  template: `
    <span
      class="vts-skeleton-input"
      [class.vts-skeleton-input-lg]="vtsSize === 'large'"
      [class.vts-skeleton-input-sm]="vtsSize === 'small'"
    ></span>
  `
})
export class VtsSkeletonElementInputComponent {
  @Input() vtsSize: VtsSkeletonInputSize = 'default';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'vts-skeleton-element[vtsType="image"]',
  template: `
    <span class="vts-skeleton-image">
      <svg
        class="vts-skeleton-image-svg"
        viewBox="0 0 1098 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="vts-skeleton-image-path"
        />
      </svg>
    </span>
  `
})
export class VtsSkeletonElementImageComponent {}
