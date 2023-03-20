/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { VtsSingletonService } from '@ui-vts/ng-vts/core/services';
import { VtsMNService } from '@ui-vts/ng-vts/message';

import { VtsToastContainerComponent } from './toast-container.component';
import { VtsToastServiceModule } from './toast.service.module';
import { VtsToastData, VtsToastDataOptions, VtsToastRef } from './typings';

let toastId = 0;

@Injectable({
  providedIn: VtsToastServiceModule
})
export class VtsToastService extends VtsMNService {
  protected override container!: VtsToastContainerComponent;
  protected componentPrefix = 'toast-';

  constructor(vtsSingletonService: VtsSingletonService, overlay: Overlay, injector: Injector) {
    super(vtsSingletonService, overlay, injector);
  }

  success(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance(
      { type: 'success', title, content },
      { ...options, vtsShowIcon: true }
    );
  }

  error(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance(
      { type: 'error', title, content },
      { ...options, vtsShowIcon: true }
    );
  }

  info(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ type: 'info', title, content }, { ...options, vtsShowIcon: true });
  }

  warning(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance(
      { type: 'warning', title, content },
      { ...options, vtsShowIcon: true }
    );
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error',
    title: string,
    content: string,
    options?: VtsToastDataOptions
  ): VtsToastRef {
    return this.createInstance({ type, title, content }, options);
  }

  template(template: TemplateRef<{}>, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ template }, options);
  }

  protected generateMessageId(): string {
    return `${this.componentPrefix}-${toastId++}`;
  }

  private createInstance(message: VtsToastData, options?: VtsToastDataOptions): VtsToastRef {
    this.container = this.withContainer(VtsToastContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: this.generateMessageId(),
        options
      },
      theme: options?.vtsTheme || 'outline',
      showIcon: options?.vtsShowIcon || true,
      closeText: options?.vtsCloseText,
      iconType: options?.vtsIconType
    });
  }
}
