/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { MessageConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { toCssPixel } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';

import { Direction } from '@angular/cdk/bidi';
import { takeUntil } from 'rxjs/operators';
import { VtsMNContainerComponent } from './base';
import { VtsMessageData } from './typings';

const VTS_CONFIG_COMPONENT_NAME = 'message';

const VTS_MESSAGE_DEFAULT_CONFIG: Required<MessageConfig> = {
  vtsAnimate: true,
  vtsDuration: 3000,
  vtsMaxStack: 7,
  vtsPauseOnHover: true,
  vtsTop: 24,
  vtsDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-message-container',
  exportAs: 'vtsMessageContainer',
  preserveWhitespaces: false,
  template: `
    <div class="vts-message" [class.vts-message-rtl]="dir === 'rtl'" [style.top]="top">
      <vts-message
        *ngFor="let instance of instances"
        [instance]="instance"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-message>
    </div>
  `
})
export class VtsMessageContainerComponent extends VtsMNContainerComponent {
  override readonly destroy$ = new Subject<void>();
  dir: Direction = 'ltr';
  override instances: Array<Required<VtsMessageData>> = [];
  top?: string | null;

  constructor(cdr: ChangeDetectorRef, vtsConfigService: VtsConfigService) {
    super(cdr, vtsConfigService);
    const config = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_COMPONENT_NAME);
    this.dir = config?.vtsDirection || 'ltr';
  }

  protected subscribeConfigChange(): void {
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateConfig();
        const config = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_COMPONENT_NAME);
        if (config) {
          const { vtsDirection } = config;
          this.dir = vtsDirection || this.dir;
        }
      });
  }

  protected updateConfig(): void {
    this.config = {
      ...VTS_MESSAGE_DEFAULT_CONFIG,
      ...this.config,
      ...this.vtsConfigService.getConfigForComponent(VTS_CONFIG_COMPONENT_NAME)
    };

    this.top = toCssPixel(this.config.vtsTop);
    this.cdr.markForCheck();
  }
}
