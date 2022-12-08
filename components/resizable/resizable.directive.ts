/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';

import { ensureInBounds, InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { getEventWithPoint } from './resizable-utils';
import { VtsResizableService } from './resizable.service';
import { VtsResizeHandleMouseDownEvent } from './resize-handle.component';

export interface VtsResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent | TouchEvent;
}

@Directive({
  selector: '[vts-resizable]',
  exportAs: 'vtsResizable',
  providers: [VtsResizableService],
  host: {
    '[class.vts-resizable-resizing]': 'resizing',
    '[class.vts-resizable-disabled]': 'vtsDisabled',
    '(mouseenter)': 'onMouseenter()',
    '(mouseleave)': 'onMouseleave()'
  }
})
export class VtsResizableDirective implements AfterViewInit, OnDestroy {
  static ngAcceptInputType_vtsLockAspectRatio: BooleanInput;
  static ngAcceptInputType_vtsPreview: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsBounds: 'window' | 'parent' | ElementRef<HTMLElement> = 'parent';
  @Input() vtsMaxHeight?: number;
  @Input() vtsMaxWidth?: number;
  @Input() vtsMinHeight: number = 40;
  @Input() vtsMinWidth: number = 40;
  @Input() vtsGridColumnCount: number = -1;
  @Input() vtsMaxColumn: number = -1;
  @Input() vtsMinColumn: number = -1;
  @Input() @InputBoolean() vtsLockAspectRatio: boolean = false;
  @Input() @InputBoolean() vtsPreview: boolean = false;
  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Output() readonly vtsResize = new EventEmitter<VtsResizeEvent>();
  @Output() readonly vtsResizeEnd = new EventEmitter<VtsResizeEvent>();
  @Output() readonly vtsResizeStart = new EventEmitter<VtsResizeEvent>();

  resizing = false;
  private elRect!: ClientRect | DOMRect;
  private currentHandleEvent: VtsResizeHandleMouseDownEvent | null = null;
  private ghostElement: HTMLDivElement | null = null;
  private el!: HTMLElement;
  private sizeCache: VtsResizeEvent | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private vtsResizableService: VtsResizableService,
    private platform: Platform,
    private ngZone: NgZone
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-resizable');
    this.vtsResizableService.handleMouseDown$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (this.vtsDisabled) {
        return;
      }
      this.resizing = true;
      this.vtsResizableService.startResizing(event.mouseEvent);
      this.currentHandleEvent = event;
      this.setCursor();
      this.vtsResizeStart.emit({
        mouseEvent: event.mouseEvent
      });
      this.elRect = this.el.getBoundingClientRect();
    });

    this.vtsResizableService.documentMouseUp$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (this.resizing) {
        this.resizing = false;
        this.vtsResizableService.documentMouseUp$.next();
        this.endResize(event);
      }
    });

    this.vtsResizableService.documentMouseMove$.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (this.resizing) {
        this.resize(event);
      }
    });
  }

  onMouseenter(): void {
    this.vtsResizableService.mouseEntered$.next(true);
  }

  onMouseleave(): void {
    this.vtsResizableService.mouseEntered$.next(false);
  }

  setPosition(): void {
    const position = getComputedStyle(this.el).position;
    if (position === 'static' || !position) {
      this.renderer.setStyle(this.el, 'position', 'relative');
    }
  }

  calcSize(width: number, height: number, ratio: number): VtsResizeEvent {
    let newWidth: number;
    let newHeight: number;
    let maxWidth: number;
    let maxHeight: number;
    let col = 0;
    let spanWidth = 0;
    let minWidth = this.vtsMinWidth;
    let boundWidth = Infinity;
    let boundHeight = Infinity;
    if (this.vtsBounds === 'parent') {
      const parent = this.renderer.parentNode(this.el);
      if (parent instanceof HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        boundWidth = parentRect.width;
        boundHeight = parentRect.height;
      }
    } else if (this.vtsBounds === 'window') {
      if (typeof window !== 'undefined') {
        boundWidth = window.innerWidth;
        boundHeight = window.innerHeight;
      }
    } else if (
      this.vtsBounds &&
      this.vtsBounds.nativeElement &&
      this.vtsBounds.nativeElement instanceof HTMLElement
    ) {
      const boundsRect = this.vtsBounds.nativeElement.getBoundingClientRect();
      boundWidth = boundsRect.width;
      boundHeight = boundsRect.height;
    }

    maxWidth = ensureInBounds(this.vtsMaxWidth!, boundWidth);
    maxHeight = ensureInBounds(this.vtsMaxHeight!, boundHeight);

    if (this.vtsGridColumnCount !== -1) {
      spanWidth = maxWidth / this.vtsGridColumnCount;
      minWidth = this.vtsMinColumn !== -1 ? spanWidth * this.vtsMinColumn : minWidth;
      maxWidth = this.vtsMaxColumn !== -1 ? spanWidth * this.vtsMaxColumn : maxWidth;
    }

    if (ratio !== -1) {
      if (/(left|right)/i.test(this.currentHandleEvent!.direction)) {
        newWidth = Math.min(Math.max(width, minWidth), maxWidth);
        newHeight = Math.min(Math.max(newWidth / ratio, this.vtsMinHeight), maxHeight);
        if (newHeight >= maxHeight || newHeight <= this.vtsMinHeight) {
          newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        }
      } else {
        newHeight = Math.min(Math.max(height, this.vtsMinHeight), maxHeight);
        newWidth = Math.min(Math.max(newHeight * ratio, minWidth), maxWidth);
        if (newWidth >= maxWidth || newWidth <= minWidth) {
          newHeight = Math.min(Math.max(newWidth / ratio, this.vtsMinHeight), maxHeight);
        }
      }
    } else {
      newWidth = Math.min(Math.max(width, minWidth), maxWidth);
      newHeight = Math.min(Math.max(height, this.vtsMinHeight), maxHeight);
    }

    if (this.vtsGridColumnCount !== -1) {
      col = Math.round(newWidth / spanWidth);
      newWidth = col * spanWidth;
    }

    return {
      col,
      width: newWidth,
      height: newHeight
    };
  }

  setCursor(): void {
    switch (this.currentHandleEvent!.direction) {
      case 'left':
      case 'right':
        this.renderer.setStyle(document.body, 'cursor', 'ew-resize');
        break;
      case 'top':
      case 'bottom':
        this.renderer.setStyle(document.body, 'cursor', 'ns-resize');
        break;
      case 'topLeft':
      case 'bottomRight':
        this.renderer.setStyle(document.body, 'cursor', 'nwse-resize');
        break;
      case 'topRight':
      case 'bottomLeft':
        this.renderer.setStyle(document.body, 'cursor', 'nesw-resize');
        break;
    }
    this.renderer.setStyle(document.body, 'user-select', 'none');
  }

  resize(event: MouseEvent | TouchEvent): void {
    const elRect = this.elRect;
    const resizeEvent = getEventWithPoint(event);
    const handleEvent = getEventWithPoint(this.currentHandleEvent!.mouseEvent);
    let width = elRect.width;
    let height = elRect.height;
    const ratio = this.vtsLockAspectRatio ? width / height : -1;
    switch (this.currentHandleEvent!.direction) {
      case 'bottomRight':
        width = resizeEvent.clientX - elRect.left;
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'bottomLeft':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'topRight':
        width = resizeEvent.clientX - elRect.left;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'topLeft':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'top':
        height = elRect.height + handleEvent.clientY - resizeEvent.clientY;
        break;
      case 'right':
        width = resizeEvent.clientX - elRect.left;
        break;
      case 'bottom':
        height = resizeEvent.clientY - elRect.top;
        break;
      case 'left':
        width = elRect.width + handleEvent.clientX - resizeEvent.clientX;
    }
    const size = this.calcSize(width, height, ratio);
    this.sizeCache = { ...size };
    this.ngZone.run(() => {
      this.vtsResize.emit({
        ...size,
        mouseEvent: event
      });
    });
    if (this.vtsPreview) {
      this.previewResize(size);
    }
  }

  endResize(event: MouseEvent | TouchEvent): void {
    this.renderer.setStyle(document.body, 'cursor', '');
    this.renderer.setStyle(document.body, 'user-select', '');
    this.removeGhostElement();
    const size = this.sizeCache
      ? { ...this.sizeCache }
      : {
          width: this.elRect.width,
          height: this.elRect.height
        };
    this.ngZone.run(() => {
      this.vtsResizeEnd.emit({
        ...size,
        mouseEvent: event
      });
    });
    this.sizeCache = null;
    this.currentHandleEvent = null;
  }

  previewResize({ width, height }: VtsResizeEvent): void {
    this.createGhostElement();
    this.renderer.setStyle(this.ghostElement, 'width', `${width}px`);
    this.renderer.setStyle(this.ghostElement, 'height', `${height}px`);
  }

  createGhostElement(): void {
    if (!this.ghostElement) {
      this.ghostElement = this.renderer.createElement('div');
      this.renderer.setAttribute(this.ghostElement, 'class', 'vts-resizable-preview');
    }
    this.renderer.appendChild(this.el, this.ghostElement);
  }

  removeGhostElement(): void {
    if (this.ghostElement) {
      this.renderer.removeChild(this.el, this.ghostElement);
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.el = this.elementRef.nativeElement;
      this.setPosition();
    }
  }

  ngOnDestroy(): void {
    this.ghostElement = null;
    this.sizeCache = null;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
