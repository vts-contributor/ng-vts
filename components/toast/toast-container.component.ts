/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ToastConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { toCssPixel } from '@ui-vts/ng-vts/core/util';

import { VtsMNContainerComponent } from '@ui-vts/ng-vts/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsToastData, VtsToastDataOptions } from './typings';

const VTS_CONFIG_MODULE_NAME = 'toast';

const VTS_TOAST_DEFAULT_CONFIG: Required<ToastConfig> = {
  vtsTop: '24px',
  vtsBottom: '24px',
  vtsPlacement: 'topRight',
  vtsDuration: 5000,
  vtsMaxStack: 7,
  vtsPauseOnHover: true,
  vtsAnimate: true,
  vtsDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-toast-container',
  exportAs: 'vtsToastContainer',
  preserveWhitespaces: false,
  template: `
    <div
      class="vts-toast vts-toast-topLeft"
      [class.vts-toast-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <vts-toast
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-toast>
    </div>
    <div
      class="vts-toast vts-toast-topRight"
      [class.vts-toast-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <vts-toast
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-toast>
    </div>
    <div
      class="vts-toast vts-toast-bottomLeft"
      [class.vts-toast-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <vts-toast
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-toast>
    </div>
    <div
      class="vts-toast vts-toast-bottomRight"
      [class.vts-toast-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <vts-toast
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-toast>
    </div>
  `
})
export class VtsToastContainerComponent extends VtsMNContainerComponent {
  dir: Direction = 'ltr';
  bottom?: string | null;
  top?: string | null;
  override config!: Required<ToastConfig>; // initialized by parent class constructor
  override instances: Array<Required<VtsToastData>> = [];
  topLeftInstances: Array<Required<VtsToastData>> = [];
  topRightInstances: Array<Required<VtsToastData>> = [];
  bottomLeftInstances: Array<Required<VtsToastData>> = [];
  bottomRightInstances: Array<Required<VtsToastData>> = [];

  constructor(cdr: ChangeDetectorRef, vtsConfigService: VtsConfigService) {
    super(cdr, vtsConfigService);
    const config = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME);
    this.dir = config?.vtsDirection || 'ltr';
  }

  override create(toast: VtsToastData): Required<VtsToastData> {
    const tost = this.onCreate(toast);
    const key = tost.options.vtsKey;
    const toastWithSameKey = this.instances.find(
      msg => msg.options.vtsKey === (toast.options as Required<VtsToastDataOptions>).vtsKey
    );
    if (key && toastWithSameKey) {
      this.replaceToast(toastWithSameKey, tost);
    } else {
      if (this.instances.length >= this.config.vtsMaxStack) {
        this.instances = this.instances.slice(1);
      }
      this.instances = [...this.instances, tost];
    }

    this.readyInstances();

    return tost;
  }

  protected override onCreate(instance: VtsToastData): Required<VtsToastData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    instance.onClick = new Subject<MouseEvent>();
    return instance as Required<VtsToastData>;
  }

  protected subscribeConfigChange(): void {
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateConfig();
        const config = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME);
        if (config) {
          const { vtsDirection } = config;
          this.dir = vtsDirection || this.dir;
        }
      });
  }

  protected updateConfig(): void {
    this.config = {
      ...VTS_TOAST_DEFAULT_CONFIG,
      ...this.config,
      ...this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME)
    };

    this.top = toCssPixel(this.config.vtsTop!);
    this.bottom = toCssPixel(this.config.vtsBottom!);

    this.cdr.markForCheck();
  }

  private replaceToast(old: VtsToastData, _new: VtsToastData): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
    old.options = _new.options;
  }

  protected override readyInstances(): void {
    this.topLeftInstances = this.instances.filter(m => m.options.vtsPlacement === 'topLeft');
    this.topRightInstances = this.instances.filter(
      m => m.options.vtsPlacement === 'topRight' || !m.options.vtsPlacement
    );
    this.bottomLeftInstances = this.instances.filter(m => m.options.vtsPlacement === 'bottomLeft');
    this.bottomRightInstances = this.instances.filter(
      m => m.options.vtsPlacement === 'bottomRight'
    );

    this.cdr.detectChanges();
  }

  protected override mergeOptions(options?: VtsToastDataOptions): VtsToastDataOptions {
    const { vtsDuration, vtsAnimate, vtsPauseOnHover, vtsPlacement } = this.config;
    return {
      vtsDuration,
      vtsAnimate,
      vtsPauseOnHover,
      vtsPlacement: vtsPlacement,
      ...options
    };
  }
}
