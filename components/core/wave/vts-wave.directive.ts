/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsWaveRenderer } from './vts-wave-renderer';

export interface VtsWaveConfig {
  disabled?: boolean;
}

export const VTS_WAVE_GLOBAL_DEFAULT_CONFIG: VtsWaveConfig = {
  disabled: false
};

export const VTS_WAVE_GLOBAL_CONFIG = new InjectionToken<VtsWaveConfig>('vts-wave-global-options', {
  providedIn: 'root',
  factory: VTS_WAVE_GLOBAL_CONFIG_FACTORY
});

export function VTS_WAVE_GLOBAL_CONFIG_FACTORY(): VtsWaveConfig {
  return VTS_WAVE_GLOBAL_DEFAULT_CONFIG;
}

@Directive({
  selector: '[vts-wave]',
  exportAs: 'vtsWave'
})
export class VtsWaveDirective implements OnInit, OnDestroy {
  @Input() vtsWaveExtraNode = false;

  private waveRenderer?: VtsWaveRenderer;
  private waveDisabled: boolean = false;

  get disabled(): boolean {
    return this.waveDisabled;
  }

  get rendererRef(): VtsWaveRenderer | undefined {
    return this.waveRenderer;
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    @Optional() @Inject(VTS_WAVE_GLOBAL_CONFIG) private config: VtsWaveConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string,
    @Inject(PLATFORM_ID) private platformId: VtsSafeAny
  ) {
    this.waveDisabled = this.isConfigDisabled();
  }

  isConfigDisabled(): boolean {
    let disabled = false;
    if (this.config && typeof this.config.disabled === 'boolean') {
      disabled = this.config.disabled;
    }
    if (this.animationType === 'NoopAnimations') {
      disabled = true;
    }
    return disabled;
  }

  ngOnDestroy(): void {
    if (this.waveRenderer) {
      this.waveRenderer.destroy();
    }
  }

  ngOnInit(): void {
    this.renderWaveIfEnabled();
  }

  renderWaveIfEnabled(): void {
    if (!this.waveDisabled && this.elementRef.nativeElement) {
      this.waveRenderer = new VtsWaveRenderer(
        this.elementRef.nativeElement,
        this.ngZone,
        this.vtsWaveExtraNode,
        this.platformId
      );
    }
  }

  disable(): void {
    this.waveDisabled = true;
    if (this.waveRenderer) {
      this.waveRenderer.removeTriggerEvent();
      this.waveRenderer.removeStyleAndExtraNode();
    }
  }

  enable(): void {
    // config priority
    this.waveDisabled = this.isConfigDisabled() || false;
    if (this.waveRenderer) {
      this.waveRenderer.bindTriggerEvent();
    }
  }
}
