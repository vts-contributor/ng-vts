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
  protected container!: VtsToastContainerComponent;
  protected componentPrefix = 'toast-';

  constructor(vtsSingletonService: VtsSingletonService, overlay: Overlay, injector: Injector) {
    super(vtsSingletonService, overlay, injector);
  }

  success(
    title: string,
    content: string,
    options?: VtsToastDataOptions
  ): VtsToastRef {
    return this.createInstance({ type: 'success', title, content, form: false, showIcon: true }, options);
  }

  error(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ type: 'error', title, content, form: false, showIcon: true }, options);
  }

  info(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ type: 'info', title, content, form: false, showIcon: true }, options);
  }

  warning(
    title: string,
    content: string,
    options?: VtsToastDataOptions
  ): VtsToastRef {
    return this.createInstance({ type: 'warning', title, content, form: false, showIcon: true }, options);
  }

  blank(title: string, content: string, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ type: 'blank', title, content, form: false, showIcon: false }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title: string,
    content: string,
    showIcon: boolean,
    form: boolean,
    options?: VtsToastDataOptions
  ): VtsToastRef {
    return this.createInstance({ type, title, content, showIcon, form }, options);
  }

  template(template: TemplateRef<{}>, options?: VtsToastDataOptions): VtsToastRef {
    return this.createInstance({ template }, options);
  }

  protected generateMessageId(): string {
    return `${this.componentPrefix}-${toastId++}`;
  }

  private createInstance(
    message: VtsToastData,
    options?: VtsToastDataOptions
  ): VtsToastRef {
    this.container = this.withContainer(VtsToastContainerComponent);

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
