/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NumberInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';

export interface VtsSliderTrackStyle {
  bottom?: string | null;
  height?: string | null;
  left?: string | null;
  right?: string | null;
  width?: string | null;
  visibility?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-slider-track',
  exportAs: 'vtsSliderTrack',
  preserveWhitespaces: false,
  template: `
    <div class="vts-slider-track" [ngStyle]="style"></div>
  `
})
export class VtsSliderTrackComponent implements OnChanges {
  static ngAcceptInputType_offset: NumberInput;
  static ngAcceptInputType_length: NumberInput;
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_included: BooleanInput;
  static ngAcceptInputType_reverse: BooleanInput;

  @Input() @InputNumber() offset: number = 0;
  @Input() @InputBoolean() reverse: boolean = false;
  @Input() dir: Direction = 'ltr';
  @Input() @InputNumber() length: number = 0;
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;

  style: VtsSliderTrackStyle = {};

  ngOnChanges(): void {
    const vertical = this.vertical;
    const reverse = this.reverse;
    const visibility = this.included ? 'visible' : 'hidden';
    const offset = this.offset;
    const length = this.length;

    const positonStyle: VtsSliderTrackStyle = vertical
      ? {
          [reverse ? 'top' : 'bottom']: `${offset}%`,
          [reverse ? 'bottom' : 'top']: 'auto',
          height: `${length}%`,
          visibility
        }
      : {
          ...this.getHorizontalStylePosition(),
          width: `${length}%`,
          visibility
        };

    this.style = positonStyle;
  }

  private getHorizontalStylePosition(): { left: string; right: string } {
    let left = this.reverse ? 'auto' : `${this.offset}%`;
    let right = this.reverse ? `${this.offset}%` : 'auto';
    if (this.dir === 'rtl') {
      const tmp = left;
      left = right;
      right = tmp;
    }
    return { left, right };
  }
}
