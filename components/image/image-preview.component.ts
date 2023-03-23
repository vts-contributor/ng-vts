/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fadeMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { isNotNil } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { VtsIconService } from '@ui-vts/ng-vts/icon';

import { FADE_CLASS_NAME_MAP, VTS_CONFIG_MODULE_NAME } from './image-config';
import { VtsImage, VtsImagePreviewOptions } from './image-preview-options';
import { VtsImagePreviewRef } from './image-preview-ref';
import { getClientSize, getFitContentPosition, getOffset } from './utils';

export interface VtsImageContainerOperation {
  icon: string;
  type: string;

  onClick(): void;
}

const initialPosition = {
  x: 0,
  y: 0
};

@Component({
  selector: 'vts-image-preview',
  exportAs: 'vtsImagePreview',
  animations: [fadeMotion],
  template: `
    <div class="vts-image-preview">
      <div
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none;"
      ></div>
      <div class="vts-image-preview-content">
        <div class="vts-image-preview-body">
          <ul class="vts-image-preview-operations">
            <li
              class="vts-image-preview-operations-operation"
              [class.vts-image-preview-operations-operation-disabled]="
                zoomOutDisabled && option.type === 'zoomOut'
              "
              (click)="option.onClick()"
              *ngFor="let option of operations"
            >
              <span
                class="vts-image-preview-operations-icon"
                vts-icon
                [vtsType]="option.icon"
              ></span>
            </li>
          </ul>
          <div
            class="vts-image-preview-img-wrapper"
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (mousedown)="onDragStarted()"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="vts-image-preview-img"
                #imgRef
                *ngIf="index === imageIndex"
                [attr.src]="image.src"
                [attr.alt]="image.alt"
                [style.width]="image.width"
                [style.height]="image.height"
                [style.transform]="previewImageTransform"
              />
            </ng-container>
          </div>
          <ng-container *ngIf="images.length > 1">
            <div
              class="vts-image-preview-switch-left"
              [class.vts-image-preview-switch-left-disabled]="index <= 0"
              (click)="onSwitchLeft($event)"
            >
              <span vts-icon vtsType="ChevronLeft"></span>
            </div>
            <div
              class="vts-image-preview-switch-right"
              [class.vts-image-preview-switch-right-disabled]="index >= images.length - 1"
              (click)="onSwitchRight($event)"
            >
              <span vts-icon vtsType="ChevronRight"></span>
            </div>
          </ng-container>
        </div>
      </div>
      <div
        tabindex="0"
        aria-hidden="true"
        style="width: 0; height: 0; overflow: hidden; outline: none;"
      ></div>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-image-preview-moving]': 'isDragging',
    '[style.zIndex]': 'config.vtsZIndex',
    '[class.vts-image-preview-wrap]': 'true',
    '[@.disabled]': 'config.vtsNoAnimation',
    '[@fadeMotion]': 'animationState',
    '(@fadeMotion.start)': 'onAnimationStart($event)',
    '(@fadeMotion.done)': 'onAnimationDone($event)',
    '(click)': 'onContainerClick($event)',
    tabindex: '-1',
    role: 'document'
  }
})
export class VtsImagePreviewComponent implements OnInit, OnDestroy {
  images: VtsImage[] = [];
  index = 0;
  isDragging = false;
  visible = true;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  previewImageTransform = '';
  previewImageWrapperTransform = '';
  operations: VtsImageContainerOperation[] = [
    {
      icon: 'AvatarPreviewClose:avatar',
      onClick: () => {
        this.onClose();
      },
      type: 'close'
    },
    {
      icon: 'AvatarPreviewZoomIn:avatar',
      onClick: () => {
        this.onZoomIn();
      },
      type: 'zoomIn'
    },
    {
      icon: 'AvatarPreviewZoomOut:avatar',
      onClick: () => {
        this.onZoomOut();
      },
      type: 'zoomOut'
    },
    {
      icon: 'AvatarPreviewRotateRight:avatar',
      onClick: () => {
        this.onRotateRight();
      },
      type: 'rotateRight'
    },
    {
      icon: 'AvatarPreviewRotateLeft:avatar',
      onClick: () => {
        this.onRotateLeft();
      },
      type: 'rotateLeft'
    }
  ];

  zoomOutDisabled = false;
  position = { ...initialPosition };
  previewRef!: VtsImagePreviewRef;
  containerClick = new EventEmitter<void>();
  closeClick = new EventEmitter<void>();

  @ViewChild('imgRef') imageRef!: ElementRef<HTMLImageElement>;

  private zoom: number;
  private rotate: number;
  private destroy$ = new Subject();

  get animationDisabled(): boolean {
    return this.config.vtsNoAnimation ?? false;
  }

  get maskClosable(): boolean {
    const defaultConfig: VtsSafeAny =
      this.vtsConfigService.getConfigForComponent(VTS_CONFIG_MODULE_NAME) || {};
    return this.config.vtsMaskClosable ?? defaultConfig.vtsMaskClosable ?? true;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    public vtsConfigService: VtsConfigService,
    public config: VtsImagePreviewOptions,
    private overlayRef: OverlayRef,
    private iconService: VtsIconService
  ) {
    // TODO: move to host after View Engine deprecation
    this.zoom = this.config.vtsZoom ?? 1;
    this.rotate = this.config.vtsRotate ?? 0;
    this.updateZoomOutDisabled();
    this.updatePreviewImageTransform();
    this.updatePreviewImageWrapperTransform();
  }

  ngOnInit(): void {
    this.addIcons();
  }

  addIcons() {
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-146" data-icon="rotate-left" aria-hidden="true"><defs><style></style></defs><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path></svg>`,
      name: 'AvatarPreviewRotateLeft',
      type: 'avatar'
    });
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-149" data-icon="rotate-left" aria-hidden="true"><defs><style></style></defs><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path></svg>`,
      name: 'AvatarPreviewRotateLeft',
      type: 'avatar'
    });
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-146" data-icon="rotate-right" aria-hidden="true"><defs><style></style></defs><path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"></path><path d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"></path></svg>`,
      name: 'AvatarPreviewRotateRight',
      type: 'avatar'
    });
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-146" data-icon="zoom-out" aria-hidden="true"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>`,
      name: 'AvatarPreviewZoomOut',
      type: 'avatar'
    });
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-146" data-icon="zoom-in" aria-hidden="true"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>`,
      name: 'AvatarPreviewZoomIn',
      type: 'avatar'
    });
    this.iconService.addIcon({
      icon: `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-149" data-icon="close" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>`,
      name: 'AvatarPreviewClose',
      type: 'avatar'
    });
  }

  setImages(images: VtsImage[]): void {
    this.images = images;
    this.cdr.markForCheck();
  }

  switchTo(index: number): void {
    this.index = index;
    this.cdr.markForCheck();
  }

  next(): void {
    if (this.index < this.images.length - 1) {
      this.reset();
      this.index++;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.cdr.markForCheck();
    }
  }

  prev(): void {
    if (this.index > 0) {
      this.reset();
      this.index--;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.cdr.markForCheck();
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  onClose(): void {
    this.closeClick.emit();
  }

  onZoomIn(): void {
    this.zoom += 1;
    this.updatePreviewImageTransform();
    this.updateZoomOutDisabled();
    this.position = { ...initialPosition };
  }

  onZoomOut(): void {
    if (this.zoom > 1) {
      this.zoom -= 1;
      this.updatePreviewImageTransform();
      this.updateZoomOutDisabled();
      this.position = { ...initialPosition };
    }
  }

  onRotateRight(): void {
    this.rotate += 90;
    this.updatePreviewImageTransform();
  }

  onRotateLeft(): void {
    this.rotate -= 90;
    this.updatePreviewImageTransform();
  }

  onSwitchLeft(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.prev();
  }

  onSwitchRight(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.next();
  }

  onContainerClick(e: MouseEvent): void {
    if (e.target === e.currentTarget && this.maskClosable) {
      this.containerClick.emit();
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'leave') {
      this.setLeaveAnimationClass();
    }

    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'leave') {
      this.setLeaveAnimationClass();
    }
    this.animationStateChanged.emit(event);
  }

  startLeaveAnimation(): void {
    this.animationState = 'leave';
    this.cdr.markForCheck();
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragReleased(): void {
    this.isDragging = false;
    const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
    const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
    const { left, top } = getOffset(this.imageRef.nativeElement);
    const { width: clientWidth, height: clientHeight } = getClientSize();
    const isRotate = this.rotate % 180 !== 0;
    const fitContentParams = {
      width: isRotate ? height : width,
      height: isRotate ? width : height,
      left,
      top,
      clientWidth,
      clientHeight
    };
    const fitContentPos = getFitContentPosition(fitContentParams);
    if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
      this.position = { ...this.position, ...fitContentPos };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updatePreviewImageTransform(): void {
    this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
  }

  private updatePreviewImageWrapperTransform(): void {
    this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }

  private updateZoomOutDisabled(): void {
    this.zoomOutDisabled = this.zoom <= 1;
  }

  private setEnterAnimationClass(): void {
    if (this.animationDisabled) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
    }
  }

  private setLeaveAnimationClass(): void {
    if (this.animationDisabled) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
    }
  }

  private reset(): void {
    this.zoom = 1;
    this.rotate = 0;
    this.position = { ...initialPosition };
  }
}
