/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { CarouselConfig } from '@ui-vts/ng-vts/core/config';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Observable } from 'rxjs';

import { VtsCarouselContentDirective } from '../carousel-content.directive';
import { FromToInterface, VtsCarouselComponentAsSource, PointerVector } from '../typings';

export abstract class VtsCarouselBaseStrategy<T = VtsSafeAny> {
  // Properties that strategies may want to use.
  protected carouselComponent: VtsCarouselComponentAsSource | null;
  protected contents!: VtsCarouselContentDirective[];
  protected items!: number;
  protected slickListEl!: HTMLElement;
  protected slickTrackEl!: HTMLElement;
  protected length!: number;
  protected unitWidth!: number;
  protected unitHeight!: number;

  protected get maxIndex(): number {
    return this.length - 1;
  }

  protected get firstEl(): HTMLElement {
    return this.contents[0].el;
  }

  protected get lastEl(): HTMLElement {
    return this.contents[this.maxIndex].el;
  }

  constructor(
    carouselComponent: VtsCarouselComponentAsSource,
    protected cdr: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected platform: Platform,
    protected options?: T
  ) {
    this.carouselComponent = carouselComponent;
  }

  /**
   * Initialize dragging sequences.
   * @param contents
   * 
   */
  withCarouselContents(contents: QueryList<VtsCarouselContentDirective> | null, config: CarouselConfig): void {
    const carousel = this.carouselComponent!;
    this.slickListEl = carousel.slickListEl;
    this.slickTrackEl = carousel.slickTrackEl;
    this.contents = contents?.toArray() || [];
    this.length = this.contents.length;

    if (this.platform.isBrowser) {
      const rect = carousel.el.getBoundingClientRect();
      if (config.vtsVertical) {
        this.unitHeight = (rect.height - (config.vtsItems - 1) * config.vtsSlideMargin) / config.vtsItems;
        this.unitWidth = rect.width;
      } else {
        this.unitWidth = (rect.width - (config.vtsItems - 1) * config.vtsSlideMargin) / config.vtsItems;
        this.unitHeight = rect.height;
      }
    } else {
      // Since we cannot call getBoundingClientRect in server, we just hide all items except for the first one.
      contents?.forEach((content, index) => {
        if (index === 0) {
          this.renderer.setStyle(content.el, 'width', '100%');
        } else {
          this.renderer.setStyle(content.el, 'display', 'none');
        }
      });
    }
  }

  /**
   * Trigger transition.
   */
  abstract switch(_f: number, _t: number, _config: CarouselConfig): Observable<void>;

  /**
   * When user drag the carousel component.
   * @optional
   */
  dragging(_vector: PointerVector, _config: CarouselConfig): void {}

  /**
   * Destroy a scroll strategy.
   */
  dispose(): void {}

  protected getFromToInBoundary(f: number, t: number): FromToInterface {
    const length = this.maxIndex + 1;
    return { from: (f + length) % length, to: (t + length) % length };
  }
}
