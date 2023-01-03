/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { CarouselConfig } from '@ui-vts/ng-vts/core/config';
import { Observable, Subject } from 'rxjs';

import { VtsCarouselContentDirective } from '../carousel-content.directive';
import { VtsCarouselComponentAsSource, PointerVector } from '../typings';

import { VtsCarouselBaseStrategy } from './base-strategy';

interface VtsCarouselTransformStrategyOptions {
  direction: 'left' | 'right';
}

export class VtsCarouselTransformStrategy extends VtsCarouselBaseStrategy<VtsCarouselTransformStrategyOptions> {
  private isDragging = false;
  private isTransitioning = false;

  // private get vertical(): boolean {
  //   return this.carouselComponent!.vertical;
  // }

  constructor(
    carouselComponent: VtsCarouselComponentAsSource,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    platform: Platform,
    options?: VtsCarouselTransformStrategyOptions
  ) {
    super(carouselComponent, cdr, renderer, platform, options);
  }

  dispose(): void {
    super.dispose();
    this.renderer.setStyle(this.slickTrackEl, 'transform', null);
  }

  withCarouselContents(contents: QueryList<VtsCarouselContentDirective> | null, config: CarouselConfig): void {
    super.withCarouselContents(contents, config);

    const carousel = this.carouselComponent!;
    const activeIndex = carousel.activeIndex;

    // We only do when we are in browser.
    if (this.platform.isBrowser && this.contents.length) {

      if (config.vtsVertical) {
        this.renderer.setStyle(this.slickListEl, 'height', `${(this.unitHeight + config.vtsSlideMargin) * config.vtsItems - config.vtsSlideMargin}px`);
        this.renderer.setStyle(this.slickTrackEl, 'width', `${this.unitWidth}px`);
        if (config.vtsItems > 1)
          this.renderer.setStyle(this.slickTrackEl, 'height', `${this.length * 2 * (this.unitHeight + config.vtsSlideMargin)}px`);
        else 
          this.renderer.setStyle(this.slickTrackEl, 'height', `${this.length * (this.unitHeight + config.vtsSlideMargin)}px`);
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(0, ${-activeIndex * this.unitHeight}px, 0)`
        );
      } else {
        this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);
        this.renderer.setStyle(this.slickTrackEl, 'height', `${this.unitHeight}px`);
        if (config.vtsItems > 1)
          this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * 2 * (this.unitWidth + config.vtsSlideMargin)}px`);
        else 
          this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * (this.unitWidth + config.vtsSlideMargin)}px`);
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(${-activeIndex * this.unitWidth}px, 0, 0)`
        );
      }

      this.contents.forEach((content: VtsCarouselContentDirective) => {
        this.renderer.setStyle(content.el, 'position', 'relative');
        this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
        this.renderer.setStyle(content.el, 'height', `${this.unitHeight}px`);
      });
    }
  }

  switch(_f: number, _t: number, _config: CarouselConfig): Observable<void> {
    const { to: t } = this.getFromToInBoundary(_f, _t);
    const complete$ = new Subject<void>();

    this.renderer.setStyle(
      this.slickTrackEl,
      'transition',
      `transform ${this.carouselComponent!.vtsTransitionSpeed}ms ease`
    );

    if (_config.vtsVertical) {
      this.verticalTransform(_f, _t, _config);
    } else {
      this.horizontalTransform(_f, _t, _config);
    }

    this.isTransitioning = true;
    this.isDragging = false;
    
    setTimeout(() => {
      this.renderer.setStyle(this.slickTrackEl, 'transition', null);
      this.contents.forEach((content: VtsCarouselContentDirective) => {
        this.renderer.setStyle(content.el, _config.vtsVertical ? 'top' : 'left', null);
      });

      if (_config.vtsVertical) {
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(0, ${-t * (this.unitHeight + _config.vtsSlideMargin)}px, 0)`
        );
      } else {
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(${-t * (this.unitWidth + _config.vtsSlideMargin)}px, 0, 0)`
        );
      }

      this.isTransitioning = false;

      complete$.next();
      complete$.complete();
    }, this.carouselComponent!.vtsTransitionSpeed);

    return complete$.asObservable();
  }

  dragging(_vector: PointerVector, _config: CarouselConfig): void {
    if (this.isTransitioning) {
      return;
    }

    const activeIndex = this.carouselComponent!.activeIndex;

    if (_config.vtsVertical) {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareVerticalContext(true, _config);
        } else if (activeIndex === 0) {
          this.prepareVerticalContext(false, _config);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-activeIndex * this.unitHeight + _vector.x}px, 0)`
      );
    } else {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareHorizontalContext(true, _config);
        } else if (activeIndex === 0) {
          this.prepareHorizontalContext(false, _config);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-activeIndex * this.unitWidth + _vector.x}px, 0, 0)`
      );
    }

    this.isDragging = true;
  }

  private verticalTransform(_f: number, _t: number, _config: CarouselConfig): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;

    if (needToAdjust) {
      this.prepareVerticalContext(t < f, _config);
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-_t * (this.unitHeight + _config.vtsSlideMargin)}px, 0)`
      );
    } else {
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-t * (this.unitHeight + _config.vtsSlideMargin)}px, 0`
      );
    }
  }

  private horizontalTransform(_f: number, _t: number, _config: CarouselConfig): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;
    if (needToAdjust) {
      this.prepareHorizontalContext(t < f, _config);
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-_t * (this.unitWidth + _config.vtsSlideMargin)}px, 0, 0)`
      );
    } else {
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-t * (this.unitWidth + _config.vtsSlideMargin)}px, 0, 0`
      );
    }
  }

  private prepareVerticalContext(lastToFirst: boolean, config: CarouselConfig): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'top', `${this.length * (this.unitHeight + config.vtsSlideMargin)}px`);
      this.renderer.setStyle(this.lastEl, 'top', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'top', null);
      this.renderer.setStyle(this.lastEl, 'top', `${-(this.unitHeight + config.vtsSlideMargin) * this.length}px`);
    }
  }

  private prepareHorizontalContext(lastToFirst: boolean, config: CarouselConfig): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'left', `${this.length * (this.unitWidth + config.vtsSlideMargin)}px`);
      this.renderer.setStyle(this.lastEl, 'left', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'left', null);
      this.renderer.setStyle(this.lastEl, 'left', `${-(this.unitWidth + config.vtsSlideMargin) * this.length}px`);
    }
  }
}
