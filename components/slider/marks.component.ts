/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { VtsDisplayedMark, VtsExtendedMark, VtsMark, VtsMarkObj } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'vts-slider-marks',
  exportAs: 'vtsSliderMarks',
  template: `
    <div class="vts-slider-mark">
      <span
        class="vts-slider-mark-text"
        *ngFor="let attr of marks; trackBy: trackById"
        [class.vts-slider-mark-text-active]="attr.active"
        [ngStyle]="attr.style!"
        [innerHTML]="attr.label"
      ></span>
    </div>
  `
})
export class VtsSliderMarksComponent implements OnChanges {
  static ngAcceptInputType_vertical: BooleanInput;
  static ngAcceptInputType_included: BooleanInput;

  @Input() lowerBound: number | null = null;
  @Input() upperBound: number | null = null;
  @Input() marksArray: VtsExtendedMark[] = [];
  @Input() min!: number;
  @Input() max!: number;
  @Input() @InputBoolean() vertical = false;
  @Input() @InputBoolean() included = false;
  @Input() reverse!: boolean;

  marks: VtsDisplayedMark[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const { marksArray, lowerBound, upperBound, reverse } = changes;

    if (marksArray || reverse) {
      this.buildMarks();
    }

    if (marksArray || lowerBound || upperBound || reverse) {
      this.togglePointActive();
    }
  }

  trackById(_index: number, mark: VtsDisplayedMark): number {
    return mark.value;
  }

  private buildMarks(): void {
    const range = this.max - this.min;

    this.marks = this.marksArray.map(mark => {
      const { value, offset, config } = mark;
      const style =
        value === this.min || value === this.max
          ? { opacity: '0' }
          : this.getMarkStyles(value, range, config);
      const label = isConfigObject(config) ? config.label : config;

      return {
        label,
        offset,
        style,
        value,
        config,
        active: false
      };
    });
  }

  private getMarkStyles(value: number, range: number, config: VtsMark): NgStyleInterface {
    let style;
    const markValue = this.reverse ? this.max + this.min - value : value;

    if (this.vertical) {
      style = {
        marginBottom: '-50%',
        bottom: `${((markValue - this.min) / range) * 100}%`
      };
    } else {
      style = {
        transform: `translate3d(-50%, 0, 0)`,
        left: `${((markValue - this.min) / range) * 100}%`
      };
    }

    if (isConfigObject(config) && config.style) {
      style = { ...style, ...config.style };
    }

    return style;
  }

  private togglePointActive(): void {
    if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
      this.marks.forEach(mark => {
        const value = mark.value;
        const isActive =
          (!this.included && value === this.upperBound) ||
          (this.included && value <= this.upperBound! && value >= this.lowerBound!);

        mark.active = isActive;
      });
    }
  }
}

function isConfigObject(config: VtsMark): config is VtsMarkObj {
  return typeof config !== 'string';
}
