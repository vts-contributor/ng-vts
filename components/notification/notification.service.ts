/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { VtsSingletonService } from '@ui-vts/ng-vts/core/services';
import { VtsMNService } from '@ui-vts/ng-vts/message';

import { VtsNotificationContainerComponent } from './notification-container.component';
import { VtsNotificationServiceModule } from './notification.service.module';
import { VtsNotificationData, VtsNotificationDataOptions, VtsNotificationRef } from './typings';

let notificationId = 0;

@Injectable({
  providedIn: VtsNotificationServiceModule
})
export class VtsNotificationService extends VtsMNService {
  protected container!: VtsNotificationContainerComponent;
  protected componentPrefix = 'notification-';

  constructor(vtsSingletonService: VtsSingletonService, overlay: Overlay, injector: Injector) {
    super(vtsSingletonService, overlay, injector);
  }

  success(
    title: string,
    content: string,
    options?: VtsNotificationDataOptions
  ): VtsNotificationRef {
    return this.createInstance({ type: 'success', title, content }, options);
  }

  error(title: string, content: string, options?: VtsNotificationDataOptions): VtsNotificationRef {
    return this.createInstance({ type: 'error', title, content }, options);
  }

  info(title: string, content: string, options?: VtsNotificationDataOptions): VtsNotificationRef {
    return this.createInstance({ type: 'info', title, content }, options);
  }

  warning(
    title: string,
    content: string,
    options?: VtsNotificationDataOptions
  ): VtsNotificationRef {
    return this.createInstance({ type: 'warning', title, content }, options);
  }

  blank(title: string, content: string, options?: VtsNotificationDataOptions): VtsNotificationRef {
    return this.createInstance({ type: 'blank', title, content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title: string,
    content: string,
    options?: VtsNotificationDataOptions
  ): VtsNotificationRef {
    return this.createInstance({ type, title, content }, options);
  }

  template(template: TemplateRef<{}>, options?: VtsNotificationDataOptions): VtsNotificationRef {
    return this.createInstance({ template }, options);
  }

  protected generateMessageId(): string {
    return `${this.componentPrefix}-${notificationId++}`;
  }

  private createInstance(
    message: VtsNotificationData,
    options?: VtsNotificationDataOptions
  ): VtsNotificationRef {
    this.container = this.withContainer(VtsNotificationContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: this.generateMessageId(),
        options
      }
    });
  }
}
