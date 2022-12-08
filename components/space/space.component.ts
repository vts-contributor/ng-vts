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
import { warnDeprecation } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsSpaceItemLegacyComponent } from './space-item.component';
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

  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  @Input() vtsDirection: VtsSpaceDirection = 'horizontal';
  @Input() vtsAlign?: VtsSpaceAlign;
  @Input() vtsJustify?: VtsSpaceJustify;
  @Input() vtsSplit: TemplateRef<{ $implicit: number }> | null = null;
  @Input() @InputBoolean() vtsWrap: boolean = false;
  // @Input() @WithConfig() vtsSize: VtsSpaceSize = 'sm';
  @Input() vtsSize?: number;
  @Input() vtsPreset: string | number | undefined;

  /**
   * @deprecated VtsSpaceItemLegacyComponent will be removed on 12.0.0, use VtsSpaceItemDirective instead.
   * @breaking-change 12.0.0
   */
  @ContentChildren(VtsSpaceItemLegacyComponent)
  vtsSpaceItemComponents!: QueryList<VtsSpaceItemLegacyComponent>;
  @ContentChildren(VtsSpaceItemDirective, { read: TemplateRef })
  items!: QueryList<TemplateRef<VtsSafeAny>>;

  mergedAlign?: VtsSpaceAlign;
  spaceSize: number = SPACE_SIZE.sm;
  private destroy$ = new Subject();

  constructor(public vtsConfigService: VtsConfigService, private cdr: ChangeDetectorRef) {}

  private updateSpaceItems(): void {
    let numberSize: number;
    if (this.vtsPreset != undefined) {
      const preset =
        this.vtsPreset >= 0 && this.vtsPreset <= 10 ? this.vtsPreset : this.vtsPreset < 0 ? 0 : 10;
      numberSize = PRESET_SPACE_SIZE[preset.toString()];
    } else {
      // numberSize = typeof this.vtsSize === 'string' ? SPACE_SIZE[this.vtsSize] : this.vtsSize;
      numberSize = this.vtsSize ?? 0;
    }
    this.spaceSize = numberSize / (!!this.vtsSplit ? 2 : 1);
    if (this.vtsSpaceItemComponents) {
      warnDeprecation(
        '`vts-space-item` in `vts-space` will be removed in 12.0.0, please use `*vtsSpaceItem` instead.'
      );
      this.vtsSpaceItemComponents.forEach(item => {
        item.setDirectionAndSize(this.vtsDirection, this.spaceSize!);
      });
    }
    this.cdr.markForCheck();
  }

  ngOnChanges(): void {
    this.updateSpaceItems();
    // this.mergedAlign = this.vtsAlign === undefined && this.vtsDirection === 'horizontal' ? 'center' : this.vtsAlign;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.updateSpaceItems();
    this.vtsSpaceItemComponents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateSpaceItems();
    });
  }
}
