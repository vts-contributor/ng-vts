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
import { NotificationConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { toCssPixel } from '@ui-vts/ng-vts/core/util';

import { VtsMNContainerComponent } from '@ui-vts/ng-vts/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsNotificationData, VtsNotificationDataOptions } from './typings';

const VTS_CONFIG_MODULE_NAME = 'notification';

const VTS_NOTIFICATION_DEFAULT_CONFIG: Required<NotificationConfig> = {
  vtsTop: '24px',
  vtsBottom: '24px',
  vtsPlacement: 'topRight',
  vtsDuration: 4500,
  vtsMaxStack: 7,
  vtsPauseOnHover: true,
  vtsAnimate: true,
  vtsDirection: 'ltr'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-notification-container',
  exportAs: 'vtsNotificationContainer',
  preserveWhitespaces: false,
  template: `
    <div
      class="vts-notification vts-notification-topLeft"
      [class.vts-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.left]="'0px'"
    >
      <vts-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-notification>
    </div>
    <div
      class="vts-notification vts-notification-topRight"
      [class.vts-notification-rtl]="dir === 'rtl'"
      [style.top]="top"
      [style.right]="'0px'"
    >
      <vts-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-notification>
    </div>
    <div
      class="vts-notification vts-notification-bottomLeft"
      [class.vts-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.left]="'0px'"
    >
      <vts-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-notification>
    </div>
    <div
      class="vts-notification vts-notification-bottomRight"
      [class.vts-notification-rtl]="dir === 'rtl'"
      [style.bottom]="bottom"
      [style.right]="'0px'"
    >
      <vts-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.vtsPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></vts-notification>
    </div>
  `
})
export class VtsNotificationContainerComponent extends VtsMNContainerComponent {
  dir: Direction = 'ltr';
  bottom?: string | null;
  top?: string | null;
  config!: Required<NotificationConfig>; // initialized by parent class constructor
  instances: Array<Required<VtsNotificationData>> = [];
  topLeftInstances: Array<Required<VtsNotificationData>> = [];
  topRightInstances: Array<Required<VtsNotificationData>> = [];
  bottomLeftInstances: Array<Required<VtsNotificationData>> = [];
  bottomRightInstances: Array<Required<VtsNotificationData>> = [];

  constructor(cdr: ChangeDetectorRef, vtsConfigService: VtsConfigService) {
    super(cdr, vtsConfigService);
    const config = this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME);
    this.dir = config?.vtsDirection || 'ltr';
  }

  create(notification: VtsNotificationData): Required<VtsNotificationData> {
    const noti = this.onCreate(notification);
    const key = noti.options.vtsKey;
    const notificationWithSameKey = this.instances.find(
      msg =>
        msg.options.vtsKey === (notification.options as Required<VtsNotificationDataOptions>).vtsKey
    );
    if (key && notificationWithSameKey) {
      this.replaceNotification(notificationWithSameKey, noti);
    } else {
      if (this.instances.length >= this.config.vtsMaxStack) {
        this.instances = this.instances.slice(1);
      }
      this.instances = [...this.instances, noti];
    }

    this.readyInstances();

    return noti;
  }

  protected onCreate(instance: VtsNotificationData): Required<VtsNotificationData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    instance.onClick = new Subject<MouseEvent>();
    return instance as Required<VtsNotificationData>;
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
      ...VTS_NOTIFICATION_DEFAULT_CONFIG,
      ...this.config,
      ...this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME)
    };

    this.top = toCssPixel(this.config.vtsTop!);
    this.bottom = toCssPixel(this.config.vtsBottom!);

    this.cdr.markForCheck();
  }

  private replaceNotification(old: VtsNotificationData, _new: VtsNotificationData): void {
    old.title = _new.title;
    old.content = _new.content;
    old.template = _new.template;
    old.type = _new.type;
    old.options = _new.options;
  }

  protected readyInstances(): void {
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

  protected mergeOptions(options?: VtsNotificationDataOptions): VtsNotificationDataOptions {
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
