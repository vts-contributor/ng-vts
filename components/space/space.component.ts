/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  TemplateRef
} from '@angular/core';
import { VtsConfigKey, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, NumberInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';

import { Subject } from 'rxjs';
import { VtsSpaceItemDirective } from './space-item.directive';
import { VtsSpaceAlign, VtsSpaceDirection, VtsSpaceJustify, VtsSpaceType } from './types';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'space';
const SPACE_SIZE: {
  [sizeKey in VtsSpaceType]: number;
} = {
  sm: 8,
  md: 16,
  lg: 24
};

const PRESET_SPACE_SIZE: {
  [key: string]: number;
} = {
  0: 0,
  1: 4,
  2: 8,
  3: 16,
  4: 24,
  5: 32,
  6: 40,
  7: 48,
  8: 64,
  9: 96,
  10: 160
};

@Component({
  selector: 'vts-space, [vts-space]',
  exportAs: 'VtsSpace',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    <ng-template ngFor let-item let-last="last" let-index="index" [ngForOf]="items">
      <div
        class="vts-space-item"
        [style.margin-bottom.px]="vtsDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="vtsDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-container [ngTemplateOutlet]="item"></ng-container>
      </div>
      <span
        *ngIf="vtsSplit && !last"
        class="vts-space-split"
        [style.margin-bottom.px]="vtsDirection === 'vertical' ? (last ? null : spaceSize) : null"
        [style.margin-right.px]="vtsDirection === 'horizontal' ? (last ? null : spaceSize) : null"
      >
        <ng-template
          [ngTemplateOutlet]="vtsSplit"
          [ngTemplateOutletContext]="{ $implicit: index }"
        ></ng-template>
      </span>
    </ng-template>
  `,
  host: {
    class: 'vts-space',
    '[class.vts-space-horizontal]': 'vtsDirection === "horizontal"',
    '[class.vts-space-vertical]': 'vtsDirection === "vertical"',
    '[class.vts-space-align-start]': 'vtsAlign === "start"',
    '[class.vts-space-align-end]': 'vtsAlign === "end"',
    '[class.vts-space-align-center]': 'vtsAlign === "center"',
    '[class.vts-space-align-baseline]': 'vtsAlign === "baseline"',
    '[class.vts-space-align-stretch]': 'vtsAlign === "stretch"',
    '[class.vts-space-justify-around]': 'vtsJustify === "around"',
    '[class.vts-space-justify-between]': 'vtsJustify === "between"',
    '[class.vts-space-justify-center]': 'vtsJustify === "center"',
    '[class.vts-space-justify-end]': 'vtsJustify === "end"',
    '[class.vts-space-justify-start]': 'vtsJustify === "start"',
    '[style.flex-wrap]': 'vtsWrap ? "wrap" : null'
  }
})
export class VtsSpaceComponent implements OnChanges, OnDestroy, AfterContentInit {
  static ngAcceptInputType_vtsWrap: BooleanInput;
  static ngAcceptInputType_vtsPreset: NumberInput;
  static ngAcceptInputType_vtsSize: NumberInput;

  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  @Input() vtsDirection: VtsSpaceDirection = 'horizontal';
  @Input() vtsAlign?: VtsSpaceAlign;
  @Input() vtsJustify?: VtsSpaceJustify;
  @Input() vtsSplit: TemplateRef<{ $implicit: number }> | null = null;
  @Input() @InputBoolean() vtsWrap: boolean = false;
  @Input() @InputNumber() vtsSize?: number;
  @Input() @InputNumber() vtsPreset?: number;

  @ContentChildren(VtsSpaceItemDirective, { read: TemplateRef })
  items!: QueryList<TemplateRef<VtsSafeAny>>;

  mergedAlign?: VtsSpaceAlign;
  spaceSize: number = SPACE_SIZE.sm;
  private destroy$ = new Subject();

  constructor(public vtsConfigService: VtsConfigService, private cdr: ChangeDetectorRef) { }

  private updateSpaceItems(): void {
    let numberSize: number;
    if (this.vtsPreset != undefined) {
      const preset =
        this.vtsPreset >= 0 && this.vtsPreset <= 10 ? this.vtsPreset : this.vtsPreset < 0 ? 0 : 10;
      numberSize = PRESET_SPACE_SIZE[preset.toString()];
    } else {
      numberSize = this.vtsSize ?? 0;
    }
    this.spaceSize = numberSize / (!!this.vtsSplit ? 2 : 1);
    this.cdr.markForCheck();
  }

  ngOnChanges(): void {
    this.updateSpaceItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.updateSpaceItems();
  }
}
