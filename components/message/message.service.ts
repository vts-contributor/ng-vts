/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { VtsSingletonService } from '@ui-vts/ng-vts/core/services';

import { VtsMNService } from './base';
import { VtsMessageContainerComponent } from './message-container.component';
import { VtsMessageServiceModule } from './message.service.module';
import { VtsMessageData, VtsMessageDataOptions, VtsMessageRef } from './typings';

@Injectable({
  providedIn: VtsMessageServiceModule
})
export class VtsMessageService extends VtsMNService {
  protected override container?: VtsMessageContainerComponent;
  protected componentPrefix = 'message-';

  constructor(vtsSingletonService: VtsSingletonService, overlay: Overlay, injector: Injector) {
    super(vtsSingletonService, overlay, injector);
  }

  success(content: string | TemplateRef<void>, options?: VtsMessageDataOptions): VtsMessageRef {
    return this.createInstance({ type: 'success', content }, options);
  }

  error(content: string | TemplateRef<void>, options?: VtsMessageDataOptions): VtsMessageRef {
    return this.createInstance({ type: 'error', content }, options);
  }

  info(content: string | TemplateRef<void>, options?: VtsMessageDataOptions): VtsMessageRef {
    return this.createInstance({ type: 'info', content }, options);
  }

  warning(content: string | TemplateRef<void>, options?: VtsMessageDataOptions): VtsMessageRef {
    return this.createInstance({ type: 'warning', content }, options);
  }

  loading(content: string | TemplateRef<void>, options?: VtsMessageDataOptions): VtsMessageRef {
    return this.createInstance({ type: 'loading', content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string,
    content: string | TemplateRef<void>,
    options?: VtsMessageDataOptions
  ): VtsMessageRef {
    return this.createInstance({ type, content }, options);
  }

  private createInstance(message: VtsMessageData, options?: VtsMessageDataOptions): VtsMessageRef {
    this.container = this.withContainer(VtsMessageContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: this.getInstanceId(),
        options
      }
    });
  }
}
