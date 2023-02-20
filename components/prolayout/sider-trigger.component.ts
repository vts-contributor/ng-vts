/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsBreakpointKey } from '@ui-vts/ng-vts/core/services';

@Component({
  selector: '[vts-prolayout-sider-trigger]',
  exportAs: 'vtsProlayoutSiderTrigger',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="vtsZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="vtsTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <i vts-icon [vtsType]="vtsCollapsed ? 'right' : 'left'" *ngIf="!vtsReverseArrow"></i>
      <i vts-icon [vtsType]="vtsCollapsed ? 'left' : 'right'" *ngIf="vtsReverseArrow"></i>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <i vts-icon vtsType="List"></i>
    </ng-template>
  `,
  host: {
    '[class.vts-prolayout-sider-trigger]': 'isNormalTrigger',
    '[style.width]': 'isNormalTrigger ? siderWidth : null',
    '[class.vts-prolayout-sider-zero-width-trigger]': 'isZeroTrigger',
    '[class.vts-prolayout-sider-zero-width-trigger-right]': 'isZeroTrigger && vtsReverseArrow',
    '[class.vts-prolayout-sider-zero-width-trigger-left]': 'isZeroTrigger && !vtsReverseArrow'
  }
})
export class VtsSiderTriggerComponent implements OnChanges, OnInit {
  @Input() vtsCollapsed = false;
  @Input() vtsReverseArrow = false;
  @Input() vtsZeroTrigger: TemplateRef<void> | null = null;
  @Input() vtsTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() matchBreakPoint = false;
  @Input() vtsCollapsedWidth: number | null = null;
  @Input() siderWidth: string | null = null;
  @Input() vtsBreakpoint: VtsBreakpointKey | null = null;
  isZeroTrigger = false;
  isNormalTrigger = false;
  updateTriggerType(): void {
    this.isZeroTrigger =
      this.vtsCollapsedWidth === 0 &&
      ((this.vtsBreakpoint && this.matchBreakPoint) || !this.vtsBreakpoint);
    this.isNormalTrigger = this.vtsCollapsedWidth !== 0;
  }
  ngOnInit(): void {
    this.updateTriggerType();
  }
  ngOnChanges(): void {
    this.updateTriggerType();
  }
}
