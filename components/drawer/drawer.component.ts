/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  Overlay,
  OverlayConfig,
  OverlayKeyboardDispatcher,
  OverlayRef
} from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { warnDeprecation } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput, NgStyleInterface, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, toCssPixel } from '@ui-vts/ng-vts/core/util';

import { VtsDrawerContentDirective } from './drawer-content.directive';
import { VtsDrawerOptionsOfComponent, VtsDrawerPlacement } from './drawer-options';
import { VtsDrawerRef } from './drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'drawer';

@Component({
  selector: 'vts-drawer',
  exportAs: 'vtsDrawer',
  template: `
    <ng-template #drawerTemplate>
      <div
        class="vts-drawer"
        [vtsNoAnimation]="vtsNoAnimation"
        [class.vts-drawer-rtl]="dir === 'rtl'"
        [class.vts-drawer-open]="isOpen"
        [class.no-mask]="!vtsMask"
        [class.vts-drawer-top]="vtsPlacement === 'top'"
        [class.vts-drawer-bottom]="vtsPlacement === 'bottom'"
        [class.vts-drawer-right]="vtsPlacement === 'right'"
        [class.vts-drawer-left]="vtsPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="vtsZIndex"
      >
        <div
          class="vts-drawer-mask"
          (click)="maskClick()"
          *ngIf="vtsMask"
          [ngStyle]="vtsMaskStyle"
        ></div>
        <div
          class="vts-drawer-content-wrapper {{ vtsWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="vts-drawer-content">
            <div class="vts-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div
                *ngIf="vtsTitle || vtsClosable"
                [class.vts-drawer-header]="!!vtsTitle"
                [class.vts-drawer-header-no-title]="!vtsTitle"
              >
                <div *ngIf="vtsTitle" class="vts-drawer-title">
                  <ng-container *vtsStringTemplateOutlet="vtsTitle">
                    <div [innerHTML]="vtsTitle"></div>
                  </ng-container>
                </div>
                <button
                  *ngIf="vtsClosable"
                  (click)="closeClick()"
                  aria-label="Close"
                  class="vts-drawer-close"
                  style="--scroll-bar: 0px;"
                >
                  <ng-container *vtsStringTemplateOutlet="vtsCloseIcon; let closeIcon">
                    <i vts-icon [vtsType]="closeIcon"></i>
                  </ng-container>
                </button>
              </div>
              <div class="vts-drawer-body" [ngStyle]="vtsBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="vtsContent; else contentElseTemp">
                  <ng-container *ngIf="isTemplateRef(vtsContent)">
                    <ng-container
                      *ngTemplateOutlet="$any(vtsContent); context: templateContext"
                    ></ng-container>
                  </ng-container>
                </ng-container>
                <ng-template #contentElseTemp>
                  <ng-container *ngIf="contentFromContentChild">
                    <ng-template [ngTemplateOutlet]="contentFromContentChild"></ng-template>
                  </ng-container>
                </ng-template>
                <ng-content *ngIf="!(vtsContent || contentFromContentChild)"></ng-content>
              </div>
              <div *ngIf="vtsFooter" class="vts-drawer-footer">
                <ng-container *vtsStringTemplateOutlet="vtsFooter">
                  <div [innerHTML]="vtsFooter"></div>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsDrawerComponent<T = VtsSafeAny, R = VtsSafeAny, D = VtsSafeAny>
  extends VtsDrawerRef<T, R>
  implements
    OnInit,
    OnDestroy,
    AfterViewInit,
    OnChanges,
    AfterContentInit,
    VtsDrawerOptionsOfComponent
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsClosable: BooleanInput;
  static ngAcceptInputType_vtsMaskClosable: BooleanInput;
  static ngAcceptInputType_vtsMask: BooleanInput;
  static ngAcceptInputType_vtsNoAnimation: BooleanInput;
  static ngAcceptInputType_vtsKeyboard: BooleanInput;
  static ngAcceptInputType_vtsCloseOnNavigation: BooleanInput;

  @Input() vtsContent!: TemplateRef<{ $implicit: D; drawerRef: VtsDrawerRef<R> }> | Type<T>;
  @Input() vtsCloseIcon: string | TemplateRef<void> = 'close';
  @Input() @InputBoolean() vtsClosable: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsMaskClosable: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsMask: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsCloseOnNavigation: boolean = true;
  @Input() @InputBoolean() vtsNoAnimation = false;
  @Input() @InputBoolean() vtsKeyboard: boolean = true;
  @Input() vtsTitle?: string | TemplateRef<{}>;
  @Input() vtsFooter?: string | TemplateRef<{}>;
  @Input() vtsPlacement: VtsDrawerPlacement = 'right';
  @Input() vtsMaskStyle: NgStyleInterface = {};
  @Input() vtsBodyStyle: NgStyleInterface = {};
  @Input() vtsWrapClassName?: string;
  @Input() vtsWidth: number | string = 256;
  @Input() vtsHeight: number | string = 256;
  @Input() vtsZIndex = 1000;
  @Input() vtsOffsetX = 0;
  @Input() vtsOffsetY = 0;
  private componentInstance: T | null = null;

  @Input()
  set vtsVisible(value: boolean) {
    this.isOpen = value;
  }

  get vtsVisible(): boolean {
    return this.isOpen;
  }

  @Output() readonly vtsOnViewInit = new EventEmitter<void>();
  @Output() readonly vtsOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly vtsVisibleChange = new EventEmitter<boolean>();

  @ViewChild('drawerTemplate', { static: true })
  drawerTemplate!: TemplateRef<void>;
  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet?: CdkPortalOutlet;
  @ContentChild(VtsDrawerContentDirective, { static: true, read: TemplateRef })
  contentFromContentChild?: TemplateRef<VtsSafeAny>;

  private destroy$ = new Subject<void>();
  previouslyFocusedElement?: HTMLElement;
  placementChanging = false;
  placementChangeTimeoutId: number | ReturnType<typeof setTimeout> = -1;
  vtsContentParams?: D; // only service
  overlayRef?: OverlayRef | null;
  portal?: TemplatePortal;
  focusTrap?: FocusTrap;
  isOpen = false;
  templateContext: { $implicit: D | undefined; drawerRef: VtsDrawerRef<R> } = {
    $implicit: undefined,
    drawerRef: this as VtsDrawerRef<R>
  };

  get offsetTransform(): string | null {
    if (!this.isOpen || this.vtsOffsetX + this.vtsOffsetY === 0) {
      return null;
    }
    switch (this.vtsPlacement) {
      case 'left':
        return `translateX(${this.vtsOffsetX}px)`;
      case 'right':
        return `translateX(-${this.vtsOffsetX}px)`;
      case 'top':
        return `translateY(${this.vtsOffsetY}px)`;
      case 'bottom':
        return `translateY(-${this.vtsOffsetY}px)`;
    }
  }

  get transform(): string | null {
    if (this.isOpen) {
      return null;
    }

    switch (this.vtsPlacement) {
      case 'left':
        return `translateX(-100%)`;
      case 'right':
        return `translateX(100%)`;
      case 'top':
        return `translateY(-100%)`;
      case 'bottom':
        return `translateY(100%)`;
    }
  }

  get width(): string | null {
    return this.isLeftOrRight ? toCssPixel(this.vtsWidth) : null;
  }

  get height(): string | null {
    return !this.isLeftOrRight ? toCssPixel(this.vtsHeight) : null;
  }

  get isLeftOrRight(): boolean {
    return this.vtsPlacement === 'left' || this.vtsPlacement === 'right';
  }

  vtsAfterOpen = new Subject<void>();
  vtsAfterClose = new Subject<R>();

  get afterOpen(): Observable<void> {
    return this.vtsAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    return this.vtsAfterClose.asObservable();
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  // from service config
  @WithConfig() vtsDirection?: Direction = undefined;

  dir: Direction = 'ltr';

  constructor(
    private cdr: ChangeDetectorRef,
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) private document: VtsSafeAny,
    public vtsConfigService: VtsConfigService,
    private renderer: Renderer2,
    private overlay: Overlay,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private focusTrapFactory: FocusTrapFactory,
    private viewContainerRef: ViewContainerRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
    @Optional() private directionality: Directionality
  ) {
    super();
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.vtsDirection || this.directionality.value;

    this.attachOverlay();
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.templateContext = {
      $implicit: this.vtsContentParams,
      drawerRef: this as VtsDrawerRef<R>
    };
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.attachBodyContent();
    setTimeout(() => {
      this.vtsOnViewInit.emit();
    });
  }

  ngAfterContentInit(): void {
    if (!(this.contentFromContentChild || this.vtsContent)) {
      warnDeprecation(
        'Usage `<ng-content></ng-content>` is deprecated, which will be removed in 12.0.0. Please instead use `<ng-template vtsDrawerContent></ng-template>` to declare the content of the drawer.'
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsPlacement, vtsVisible } = changes;
    if (vtsVisible) {
      const value = changes.vtsVisible.currentValue;
      if (value) {
        this.open();
      } else {
        this.close();
      }
    }
    if (vtsPlacement && !vtsPlacement.isFirstChange()) {
      this.triggerPlacementChangeCycleOnce();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearTimeout(this.placementChangeTimeoutId);
    this.disposeOverlay();
  }

  private getAnimationDuration(): number {
    return this.vtsNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
  }

  // Disable the transition animation temporarily when the placement changing
  private triggerPlacementChangeCycleOnce(): void {
    if (!this.vtsNoAnimation) {
      this.placementChanging = true;
      this.changeDetectorRef.markForCheck();
      clearTimeout(this.placementChangeTimeoutId);
      this.placementChangeTimeoutId = setTimeout(() => {
        this.placementChanging = false;
        this.changeDetectorRef.markForCheck();
      }, this.getAnimationDuration());
    }
  }

  close(result?: R): void {
    this.isOpen = false;
    this.vtsVisibleChange.emit(false);
    this.updateOverlayStyle();
    this.overlayKeyboardDispatcher.remove(this.overlayRef!);
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.updateBodyOverflow();
      this.restoreFocus();
      this.vtsAfterClose.next(result);
      this.vtsAfterClose.complete();
      this.componentInstance = null;
    }, this.getAnimationDuration());
  }

  open(): void {
    this.attachOverlay();
    this.isOpen = true;
    this.vtsVisibleChange.emit(true);
    this.overlayKeyboardDispatcher.add(this.overlayRef!);
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.savePreviouslyFocusedElement();
    this.trapFocus();
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.vtsAfterOpen.next();
    }, this.getAnimationDuration());
  }

  getContentComponent(): T | null {
    return this.componentInstance;
  }

  closeClick(): void {
    this.vtsOnClose.emit();
  }

  maskClick(): void {
    if (this.vtsMaskClosable && this.vtsMask) {
      this.vtsOnClose.emit();
    }
  }

  private attachBodyContent(): void {
    this.bodyPortalOutlet!.dispose();

    if (this.vtsContent instanceof Type) {
      const childInjector = Injector.create({
        parent: this.injector,
        providers: [{ provide: VtsDrawerRef, useValue: this }]
      });
      const componentPortal = new ComponentPortal<T>(this.vtsContent, null, childInjector);
      const componentRef = this.bodyPortalOutlet!.attachComponentPortal(componentPortal);
      this.componentInstance = componentRef.instance;
      Object.assign(componentRef.instance, this.vtsContentParams);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayRef!.keydownEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: KeyboardEvent) => {
          if (event.keyCode === ESCAPE && this.isOpen && this.vtsKeyboard) {
            this.vtsOnClose.emit();
          }
        });
      this.overlayRef
        .detachments()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.disposeOverlay();
        });
    }
  }

  private disposeOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      disposeOnNavigation: this.vtsCloseOnNavigation,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
  }

  private updateOverlayStyle(): void {
    if (this.overlayRef && this.overlayRef.overlayElement) {
      this.renderer.setStyle(
        this.overlayRef.overlayElement,
        'pointer-events',
        this.isOpen ? 'auto' : 'none'
      );
    }
  }

  private updateBodyOverflow(): void {
    if (this.overlayRef) {
      if (this.isOpen) {
        this.overlayRef.getConfig().scrollStrategy!.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy!.disable();
      }
    }
  }

  savePreviouslyFocusedElement(): void {
    if (this.document && !this.previouslyFocusedElement) {
      this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
      // We need the extra check, because IE's svg element has no blur method.
      if (
        this.previouslyFocusedElement &&
        typeof this.previouslyFocusedElement.blur === 'function'
      ) {
        this.previouslyFocusedElement.blur();
      }
    }
  }

  private trapFocus(): void {
    if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
      this.focusTrap = this.focusTrapFactory.create(this.overlayRef!.overlayElement);
      this.focusTrap.focusInitialElement();
    }
  }

  private restoreFocus(): void {
    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (
      this.previouslyFocusedElement &&
      typeof this.previouslyFocusedElement.focus === 'function'
    ) {
      this.previouslyFocusedElement.focus();
    }
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
