/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional } from '@angular/core';
import { ImageConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';

import { IMAGE_PREVIEW_MASK_CLASS_NAME, VTS_CONFIG_MODULE_NAME } from './image-config';
import { VtsImage, VtsImagePreviewOptions } from './image-preview-options';
import { VtsImagePreviewRef } from './image-preview-ref';
import { VtsImagePreviewComponent } from './image-preview.component';

export interface VtsImageService {
  preview(images: VtsImage[], option?: VtsImagePreviewOptions): VtsImagePreviewRef;
}

@Injectable()
export class VtsImageService {
  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private vtsConfigService: VtsConfigService,
    @Optional() private directionality: Directionality
  ) {}

  preview(images: VtsImage[], options?: VtsImagePreviewOptions): VtsImagePreviewRef {
    return this.display(images, options);
  }

  private display(images: VtsImage[], config?: VtsImagePreviewOptions): VtsImagePreviewRef {
    const configMerged = { ...new VtsImagePreviewOptions(), ...(config ?? {}) };
    const overlayRef = this.createOverlay(configMerged);
    const previewComponent = this.attachPreviewComponent(overlayRef, configMerged);
    previewComponent.setImages(images);
    const previewRef = new VtsImagePreviewRef(previewComponent, configMerged, overlayRef);

    previewComponent.previewRef = previewRef;
    return previewRef;
  }

  private attachPreviewComponent(
    overlayRef: OverlayRef,
    config: VtsImagePreviewOptions
  ): VtsImagePreviewComponent {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: VtsImagePreviewOptions, useValue: config }
      ]
    });

    const containerPortal = new ComponentPortal(VtsImagePreviewComponent, null, injector);
    const containerRef = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(config: VtsImagePreviewOptions): OverlayRef {
    const globalConfig =
      (this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME) as ImageConfig) || {};
    const overLayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: config.vtsCloseOnNavigation ?? globalConfig.vtsCloseOnNavigation ?? true,
      backdropClass: IMAGE_PREVIEW_MASK_CLASS_NAME,
      direction: config.vtsDirection || globalConfig.vtsDirection || this.directionality.value
    });

    return this.overlay.create(overLayConfig);
  }
}
