/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsDrawerOptions, VtsDrawerOptionsOfComponent } from './drawer-options';
import { VtsDrawerRef } from './drawer-ref';
import { VtsDrawerComponent } from './drawer.component';
import { VtsDrawerServiceModule } from './drawer.service.module';

export class DrawerBuilderForService<T, R> {
  private drawerRef: VtsDrawerComponent<T, R> | null;
  private overlayRef: OverlayRef;
  private unsubscribe$ = new Subject<void>();

  constructor(private overlay: Overlay, private options: VtsDrawerOptions) {
    /** pick {@link VtsDrawerOptions.vtsOnCancel} and omit this option */
    const { vtsOnCancel, ...componentOption } = this.options;
    this.overlayRef = this.overlay.create();
    this.drawerRef = this.overlayRef.attach(new ComponentPortal(VtsDrawerComponent)).instance;
    this.updateOptions(componentOption);
    // Prevent repeatedly open drawer when tap focus element.
    this.drawerRef.savePreviouslyFocusedElement();
    this.drawerRef.vtsOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.drawerRef!.open();
    });
    this.drawerRef.vtsOnClose.subscribe(() => {
      if (vtsOnCancel) {
        vtsOnCancel().then(canClose => {
          if (canClose !== false) {
            this.drawerRef!.close();
          }
        });
      } else {
        this.drawerRef!.close();
      }
    });

    this.drawerRef.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.overlayRef.dispose();
      this.drawerRef = null;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    });
  }

  getInstance(): VtsDrawerRef<T, R> {
    return this.drawerRef!;
  }

  updateOptions(options: VtsDrawerOptionsOfComponent): void {
    Object.assign(this.drawerRef!, options);
  }
}

@Injectable({ providedIn: VtsDrawerServiceModule })
export class VtsDrawerService {
  constructor(private overlay: Overlay) {}

  create<T = VtsSafeAny, D = undefined, R = VtsSafeAny>(
    options: VtsDrawerOptions<T, D extends undefined ? {} : D>
  ): VtsDrawerRef<T, R> {
    return new DrawerBuilderForService<T, R>(this.overlay, options).getInstance();
  }
}
